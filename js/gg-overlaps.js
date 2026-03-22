/**
 * GG Overlaps — highlightOnMap(), drawOverlapPolygon().
 * Depende de: gg-namespace.js, gg-helpers.js, gg-map.js (para GG._Graphic, GG._Polygon)
 */
(function() {
    'use strict';

    var overlapColors = {
        'deforestation_prodes': [239, 68, 68, 0.5],
        'deforestation_deter': [251, 146, 60, 0.5],
        'deforestation_mapbiomas': [239, 68, 68, 0.5],
        'terra_indigena': [168, 85, 247, 0.5],
        'quilombola': [168, 85, 247, 0.5],
        'embargo_ibama': [239, 68, 68, 0.5],
        'uc': [245, 158, 11, 0.5],
        'queimadas': [251, 146, 60, 0.5],
        'app_hidrografia': [59, 130, 246, 0.5],
        'app_water': [59, 130, 246, 0.5],
        'floresta_publica': [34, 197, 94, 0.5],
        'concessao_florestal': [34, 197, 94, 0.5],
        'sicar_status': [156, 163, 175, 0.5],
        'pivos_irrigacao': [6, 182, 212, 0.5]
    };

    var overlapBorderColors = {
        'deforestation_prodes': [239, 68, 68],
        'deforestation_deter': [251, 146, 60],
        'deforestation_mapbiomas': [239, 68, 68],
        'terra_indigena': [168, 85, 247],
        'quilombola': [168, 85, 247],
        'embargo_ibama': [239, 68, 68],
        'uc': [245, 158, 11],
        'queimadas': [251, 146, 60],
        'app_hidrografia': [59, 130, 246],
        'app_water': [59, 130, 246],
        'floresta_publica': [34, 197, 94],
        'concessao_florestal': [34, 197, 94],
        'sicar_status': [156, 163, 175],
        'pivos_irrigacao': [6, 182, 212]
    };

    function drawOverlapPolygon(rings, fillColor, borderColor, name, overlapHa, idx) {
        var Graphic = GG._Graphic;
        var Polygon = GG._Polygon;

        if (!Graphic || !Polygon) {
            console.warn('ESRI constructors not loaded yet');
            return;
        }

        var poly = new Polygon({
            rings: rings,
            spatialReference: { wkid: 4326 }
        });

        var graphic = new Graphic({
            geometry: poly,
            symbol: {
                type: "simple-fill",
                color: fillColor,
                outline: {
                    color: borderColor,
                    width: 2,
                    style: "solid"
                }
            },
            attributes: {
                name: name || 'Sobreposição ' + (idx + 1),
                overlap_ha: overlapHa || 0
            },
            popupTemplate: {
                title: "{name}",
                content: "Área de sobreposição: {overlap_ha} ha"
            }
        });

        GG.overlapsLayer.add(graphic);
    }

    function highlightOnMap(checkType, event) {
        event.stopPropagation();

        var checkNames = {
            'deforestation_prodes': GG.t('check_deforestation_prodes'),
            'deforestation_mapbiomas': GG.t('check_deforestation_mapbiomas'),
            'terra_indigena': GG.t('check_terra_indigena'),
            'quilombola': GG.t('check_quilombola'),
            'uc': GG.t('check_uc'),
            'embargo_ibama': GG.t('check_embargo_ibama'),
            'app_water': GG.t('check_app_water')
        };

        if (GG.overlapsLayer) {
            GG.overlapsLayer.removeAll();
        }

        if (!GG.currentValidationResult || !GG.currentValidationResult.checks) {
            GG.showToast('Nenhum resultado de validação disponível', 'error');
            return;
        }

        var check = GG.currentValidationResult.checks.find(function(c) { return c.check_type === checkType; });
        if (!check) {
            GG.showToast('Check não encontrado: ' + checkType, 'error');
            return;
        }

        var geometries = check.intersection_geometries || [];
        if (geometries.length === 0) {
            GG.showToast('Nenhuma geometria de sobreposição disponível', 'info');
            if (window.flashCurrentGraphic) {
                window.flashCurrentGraphic();
            }
            return;
        }

        var fillColor = overlapColors[checkType] || [239, 68, 68, 0.5];
        var borderColor = overlapBorderColors[checkType] || [239, 68, 68];

        var drawnCount = 0;
        geometries.forEach(function(item, idx) {
            var geom = item.geometry;
            if (!geom || !geom.type) return;

            try {
                if (geom.type === 'Polygon') {
                    drawOverlapPolygon(geom.coordinates, fillColor, borderColor, item.name, item.overlap_ha, idx);
                    drawnCount++;
                } else if (geom.type === 'MultiPolygon') {
                    geom.coordinates.forEach(function(polyCoords, pIdx) {
                        drawOverlapPolygon(polyCoords, fillColor, borderColor, item.name, item.overlap_ha, pIdx);
                        drawnCount++;
                    });
                } else {
                    console.warn('Tipo de geometria não suportado:', geom.type);
                }
            } catch (err) {
                console.error('Erro ao desenhar overlap:', err);
            }
        });

        if (drawnCount > 0) {
            GG.showToast((checkNames[checkType] || 'Sobreposição') + ' destacada no mapa (' + drawnCount + ' área' + (drawnCount > 1 ? 's' : '') + ')', 'success');

            if (GG.view && GG.overlapsLayer.graphics.length > 0) {
                var allGraphics = GG.overlapsLayer.graphics.toArray();
                GG.view.goTo(allGraphics, {
                    duration: 1000,
                    easing: 'ease-in-out'
                }).catch(function() {});
            }
        } else {
            GG.showToast('Não foi possível desenhar as sobreposições', 'warning');
        }
    }

    // Attach to namespace
    GG.highlightOnMap = highlightOnMap;

    // Window exports
    window.highlightOnMap = highlightOnMap;
})();
