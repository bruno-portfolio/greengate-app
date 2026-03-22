/**
 * GG Map — ArcGIS inicializacao, mapa, SketchVM, busca, botoes.
 * Depende de: gg-namespace.js, gg-helpers.js, gg-storage.js
 */
(function() {
    'use strict';

    require([
        "esri/Map", "esri/views/MapView", "esri/layers/GraphicsLayer",
        "esri/widgets/Sketch/SketchViewModel", "esri/Graphic",
        "esri/geometry/geometryEngine", "esri/geometry/Polygon",
        "esri/widgets/BasemapGallery", "esri/widgets/Expand",
        "esri/geometry/support/webMercatorUtils", "esri/rest/locator"
    ], function(Map, MapView, GraphicsLayer, SketchVM, Graphic, geoEng, Polygon, BasemapGallery, Expand, wmUtils, locator) {

        GG.geoEngine = geoEng;
        GG.webMercatorUtils = wmUtils;
        GG._Graphic = Graphic;
        GG._Polygon = Polygon;
        GG._locator = locator;

        GG.map = new Map({ basemap: "hybrid" });
        GG.view = new MapView({
            container: "map",
            map: GG.map,
            center: [-55.5, -12.5],
            zoom: GG.ZOOM_COUNTRY,
            ui: { padding: { bottom: 200 } }
        });

        GG.view.ui.move("zoom", "bottom-right");
        GG.view.ui.add(new Expand({
            view: GG.view,
            content: new BasemapGallery({ view: GG.view }),
            expandIconClass: "esri-icon-basemap",
            autoCollapse: true
        }), "top-right");

        GG.graphicsLayer = new GraphicsLayer();
        GG.map.add(GG.graphicsLayer);

        GG.overlapsLayer = new GraphicsLayer();
        GG.map.add(GG.overlapsLayer);

        GG.sketchVM = new SketchVM({
            view: GG.view,
            layer: GG.graphicsLayer,
            polygonSymbol: {
                type: "simple-fill",
                color: [59,130,246,0.3],
                outline: { color: [59,130,246], width: 2 }
            }
        });

        // Flash polygon (visual feedback on check click)
        GG.flashCurrentGraphic = function() {
            if (!GG.currentGraphic) return;
            var original = GG.currentGraphic.symbol;
            var outline = (original && original.outline) ? original.outline : { color: [255,255,255,1], width: 2 };
            GG.currentGraphic.symbol = {
                type: "simple-fill",
                color: original ? original.color : [59,130,246,0.3],
                outline: { color: outline.color, width: 5 }
            };
            setTimeout(function() { if (GG.currentGraphic) GG.currentGraphic.symbol = original; }, 250);
        };
        window.flashCurrentGraphic = GG.flashCurrentGraphic;

        // ========== SEARCH ==========
        var GEOCODE = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
        var sInput = document.getElementById('searchInput');
        var sResults = document.getElementById('searchResults');
        var sClear = document.getElementById('searchClear');

        var lastSearchResults = [];
        var geocodeCache = new Map();

        function setSearchStatus(container, className, message) {
            container.textContent = '';
            var div = document.createElement('div');
            div.className = className;
            div.textContent = message;
            container.appendChild(div);
        }

        function renderSearchResults(results) {
            lastSearchResults = results;
            if (!results.length) {
                setSearchStatus(sResults, 'search-empty', GG.t('noResults'));
                return;
            }
            sResults.textContent = '';
            var frag = document.createDocumentFragment();
            results.forEach(function(r, i) {
                var item = document.createElement('div');
                item.className = 'search-item';
                item.dataset.i = i;
                var nameDiv = document.createElement('div');
                nameDiv.className = 'search-item-name';
                nameDiv.textContent = r.address || '';
                var typeDiv = document.createElement('div');
                typeDiv.className = 'search-item-type';
                typeDiv.textContent = (r.attributes && r.attributes.Addr_type) || 'Local';
                item.appendChild(nameDiv);
                item.appendChild(typeDiv);
                item.onclick = function() {
                    GG.view.goTo({ center: [r.location.longitude, r.location.latitude], zoom: r.attributes.Addr_type === 'Locality' ? GG.ZOOM_LOCALITY : GG.ZOOM_REGION });
                    sInput.value = r.address;
                    sResults.classList.remove('show');
                };
                frag.appendChild(item);
            });
            sResults.appendChild(frag);
        }

        sInput.oninput = function(e) {
            var q = e.target.value.trim();
            sClear.classList.toggle('show', q.length > 0);
            if (GG.searchTimeout) clearTimeout(GG.searchTimeout);
            if (q.length < 2) { sResults.classList.remove('show'); return; }

            setSearchStatus(sResults, 'search-loading', GG.t('searching'));
            sResults.classList.add('show');

            GG.searchTimeout = setTimeout(function() {
                if (geocodeCache.has(q)) {
                    renderSearchResults(geocodeCache.get(q));
                    return;
                }

                locator.addressToLocations(GEOCODE, {
                    address: { SingleLine: q + ", Brasil" },
                    countryCode: "BRA",
                    maxLocations: 5,
                    outFields: ["Addr_type", "City", "Region"]
                }).then(function(res) {
                    if (geocodeCache.size >= GG.GEOCODING_CACHE_MAX) {
                        geocodeCache.delete(geocodeCache.keys().next().value);
                    }
                    geocodeCache.set(q, res || []);
                    renderSearchResults(res || []);
                }).catch(function() { setSearchStatus(sResults, 'search-empty', GG.t('searchError')); });
            }, GG.SEARCH_DEBOUNCE_MS);
        };

        sInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && lastSearchResults.length) {
                var r = lastSearchResults[0];
                GG.view.goTo({
                    center: [r.location.longitude, r.location.latitude],
                    zoom: r.attributes.Addr_type === 'Locality' ? GG.ZOOM_LOCALITY : GG.ZOOM_REGION
                });
                sInput.value = r.address;
                sResults.classList.remove('show');
            }
        });

        sClear.onclick = function() {
            sInput.value = '';
            sClear.classList.remove('show');
            sResults.classList.remove('show');
        };

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-box')) sResults.classList.remove('show');
        });

        // ========== Reverse geocode ==========
        function fillMetaFromGeometry(geo) {
            try {
                if (!geo || !geo.centroid) return;
                var c = geo.centroid;
                if (c.spatialReference && c.spatialReference.isWebMercator) c = wmUtils.webMercatorToGeographic(c);

                locator.locationToAddress(GEOCODE, {
                    location: c,
                    outFields: ["City", "Region", "Subregion", "Neighborhood"],
                    langCode: "pt"
                }).then(function(resp) {
                    var attrs = (resp && resp.attributes) || {};
                    var municipality = attrs.City || null;
                    var state = attrs.Region || null;

                    GG.currentMeta = {
                        municipality: municipality,
                        state: state,
                        address: (resp && resp.address) || null
                    };

                    var metaEl = document.getElementById('areaMeta');
                    var parts = [];
                    if (municipality) parts.push(municipality);
                    if (state) parts.push(state);
                    metaEl.textContent = parts.length ? parts.join(' \u2022 ') : '';
                }).catch(function() {});
            } catch (_) {}
        }
        GG.fillMetaFromGeometry = fillMetaFromGeometry;

        // ========== AREA ==========
        function checkArea(geo) {
            if (!geo) return false;
            var area = Math.abs(geoEng.geodesicArea(geo, "square-meters")) / 10000;
            var c = geo.centroid;
            var ai = document.getElementById('areaInfo');

            document.getElementById('areaValue').textContent = area.toFixed(2);
            document.getElementById('areaCoords').textContent = c ? c.latitude.toFixed(5) + ', ' + c.longitude.toFixed(5) : '';
            ai.classList.add('show');

            if (area > GG.MAX_AREA_HA) {
                ai.classList.add('limit-exceeded');
                GG.setValidateAvailability();
                return false;
            }
            ai.classList.remove('limit-exceeded');
            GG.setValidateAvailability();
            return true;
        }
        GG.checkArea = checkArea;

        GG.sketchVM.on(["create", "update"], function(e) {
            if (e.state === "active") checkArea(e.graphic.geometry);

            if (e.state === "complete") {
                GG.currentGraphic = e.graphic;

                var geo = e.graphic.geometry;
                if (geo.spatialReference && geo.spatialReference.isWebMercator) geo = wmUtils.webMercatorToGeographic(geo);

                var simp = geoEng.simplify(geo) || geo;
                GG.currentPolygon = { type: "Polygon", coordinates: simp.rings };

                document.getElementById('drawOptions').classList.remove('show');
                document.getElementById('drawBtn').classList.remove('active');

                var ok = checkArea(simp);
                if (ok) fillMetaFromGeometry(simp);
            }
        });

        // loadGeoJSON
        function loadGeoJSON(geom) {
            GG.clearAll();
            var poly = new Polygon({ rings: geom.coordinates, spatialReference: { wkid: 4326 } });
            var g = new Graphic({
                geometry: poly,
                symbol: { type: "simple-fill", color: [59,130,246,0.3], outline: { color: [59,130,246], width: 2 } }
            });

            GG.graphicsLayer.add(g);
            GG.currentGraphic = g;
            GG.view.goTo(g.geometry.extent.expand(1.5));

            GG.currentPolygon = geom;

            var ok = checkArea(poly);
            if (ok) fillMetaFromGeometry(poly);
        }
        GG.loadGeoJSON = loadGeoJSON;
        window.loadGeoJSON = loadGeoJSON;

        // updateColor
        function updateColor(s) {
            if (!GG.currentGraphic) return;
            var colors = {
                approved: [[16,185,129,0.3],[16,185,129]],
                rejected: [[239,68,68,0.3],[239,68,68]],
                warning: [[245,158,11,0.3],[245,158,11]]
            };
            var c = colors[s] || [[59,130,246,0.3],[59,130,246]];
            GG.currentGraphic.symbol = { type: "simple-fill", color: c[0], outline: { color: c[1], width: 2 } };
        }
        GG.updateColor = updateColor;
        window.updateColor = updateColor;

        // ========== BUTTONS ==========
        document.getElementById('drawBtn').onclick = function(e) {
            e.preventDefault();
            if (GG.sketchVM.state === "active") GG.sketchVM.cancel();
            document.getElementById('drawOptions').classList.toggle('show');
            document.getElementById('drawBtn').classList.toggle('active');
        };

        document.getElementById('drawPolygon').onclick = function(e) {
            e.preventDefault();
            GG.clearAll();
            GG.sketchVM.create("polygon");
            document.getElementById('drawOptions').classList.remove('show');
        };

        document.getElementById('drawRect').onclick = function(e) {
            e.preventDefault();
            GG.clearAll();
            GG.sketchVM.create("rectangle");
            document.getElementById('drawOptions').classList.remove('show');
        };

        document.getElementById('clearBtn').onclick = function(e) { e.preventDefault(); GG.clearAll(); };

        document.getElementById('locateBtn').onclick = function(e) {
            e.preventDefault();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(p) {
                    GG.view.goTo({ center: [p.coords.longitude, p.coords.latitude], zoom: GG.ZOOM_LOCATE });
                });
            }
        };

        document.getElementById('fullscreenBtn').onclick = function(e) {
            e.preventDefault();
            document.body.classList.add('fullscreen-mode');
            setTimeout(function() { GG.view.requestResize(); }, 100);
        };

        document.getElementById('closeFullscreen').onclick = function(e) {
            e.preventDefault();
            document.body.classList.remove('fullscreen-mode');
            GG.view.requestResize();
        };
    });
})();
