/**
 * GG Validation — validate(), showResult(), displayDataFreshness().
 * Depende de: gg-namespace.js, gg-helpers.js, gg-storage.js, gg-map.js
 */
(function() {
    'use strict';

    function isKnownExampleArea(polygon) {
        if (!polygon || !polygon.coordinates || !polygon.coordinates[0]) return false;
        var ring = polygon.coordinates[0];
        if (ring.length !== GG.EXAMPLE_COORDS.length) return false;
        for (var i = 0; i < ring.length; i++) {
            if (Math.abs(ring[i][0] - GG.EXAMPLE_COORDS[i][0]) > 1e-8 ||
                Math.abs(ring[i][1] - GG.EXAMPLE_COORDS[i][1]) > 1e-8) return false;
        }
        return true;
    }

    function displayDataFreshness(dataFreshness) {
        if (!dataFreshness || Object.keys(dataFreshness).length === 0) {
            document.getElementById('dataFreshnessCard').style.display = 'none';
            return;
        }

        var card = document.getElementById('dataFreshnessCard');
        var content = document.getElementById('dataFreshnessContent');

        var layerNames = {
            'prodes': GG.t('layer_prodes'),
            'embargo_ibama': GG.t('layer_embargo_ibama'),
            'terra_indigena': GG.t('layer_terra_indigena'),
            'uc': GG.t('layer_uc'),
            'quilombola': GG.t('layer_quilombola'),
            'mapbiomas': GG.t('layer_mapbiomas'),
            'mapbiomas_alerta': GG.t('layer_mapbiomas'),
            'deter': GG.t('layer_deter'),
            'queimadas': GG.t('layer_queimadas'),
            'ana': GG.t('layer_hidrografia'),
            'ana_hidrografia': GG.t('layer_hidrografia'),
            'ana_pivos': GG.t('layer_pivos'),
            'sfb': GG.t('layer_floresta_publica'),
            'sfb_cnfp': GG.t('layer_floresta_publica'),
            'sfb_concessoes': GG.t('layer_concessao_florestal'),
            'sicar': GG.t('layer_sicar'),
            'funai': GG.t('layer_terra_indigena'),
            'ibama': GG.t('layer_embargo_ibama'),
            'incra': GG.t('layer_quilombola'),
            'icmbio': GG.t('layer_uc')
        };

        content.textContent = '';
        var grid = document.createElement('div');
        grid.className = 'data-freshness-grid';

        var locale = GG.getDateLocale();
        var entries = Object.entries(dataFreshness);
        for (var i = 0; i < entries.length; i++) {
            var layer = entries[i][0];
            var date = entries[i][1];
            var layerDate = new Date(date);
            var formattedDate = layerDate.toLocaleDateString(locale);
            var layerName = layerNames[layer] || layer;

            var daysSince = Math.floor((Date.now() - layerDate.getTime()) / (1000 * 60 * 60 * 24));
            var freshnessClass = 'freshness-ok';
            if (daysSince > 30) freshnessClass = 'freshness-warn';
            if (daysSince > 90) freshnessClass = 'freshness-stale';

            var item = document.createElement('div');
            item.className = 'freshness-item ' + freshnessClass;

            var nameEl = document.createElement('strong');
            nameEl.className = 'freshness-layer';
            nameEl.textContent = layerName;

            var dateEl = document.createElement('span');
            dateEl.className = 'freshness-date';
            dateEl.textContent = formattedDate;

            var agoEl = document.createElement('span');
            agoEl.className = 'freshness-ago ' + freshnessClass;
            if (daysSince === 0) agoEl.textContent = '\u2022 ' + GG.t('timeToday');
            else if (daysSince === 1) agoEl.textContent = '\u2022 ' + GG.t('timeYesterday');
            else if (daysSince < 7) agoEl.textContent = '\u2022 ' + daysSince + ' ' + GG.t('timeDaysAgo');
            else if (daysSince < 30) agoEl.textContent = '\u2022 ' + Math.floor(daysSince / 7) + ' ' + GG.t('timeWeeksAgo');
            else agoEl.textContent = '\u2022 ' + Math.floor(daysSince / 30) + ' ' + GG.t('timeMonthsAgo');

            item.appendChild(nameEl);
            item.appendChild(dateEl);
            item.appendChild(agoEl);
            grid.appendChild(item);
        }

        content.appendChild(grid);
        card.style.display = 'block';
    }

    function showResult(d) {
        GG.currentValidationResult = d;

        if (GG.overlapsLayer) {
            GG.overlapsLayer.removeAll();
        }

        if (d.data_freshness) {
            displayDataFreshness(d.data_freshness);
        }

        document.getElementById('resultCard').classList.add('show');
        document.getElementById('resultBanner').className = 'result-banner ' + d.status;

        var resultIconEl = document.getElementById('resultIcon');
        resultIconEl.textContent = '';
        var iconName = d.status === 'approved' ? 'check' : d.status === 'rejected' ? 'x' : 'warning';
        resultIconEl.appendChild(GG.createSvgIcon(iconName, 'icon-xl'));

        document.getElementById('resultTitle').textContent = d.status === 'approved' ? GG.t('statusApproved') : d.status === 'rejected' ? GG.t('statusRejected') : GG.t('statusWarning');

        var conf = GG.clampConf(d.risk_score);
        var label = GG.confLabel(conf);

        document.getElementById('resultSubtitle').textContent = GG.t('compliance') + ' ' + conf + '/100 \u2022 ' + label;

        var fill = document.getElementById('complianceFill');
        fill.style.width = conf + '%';
        fill.className = 'compliance-fill ' + (conf >= 70 ? 'high' : conf >= 40 ? 'medium' : 'low');

        document.getElementById('complianceValue').textContent = conf;
        document.getElementById('complianceLabel').textContent = label;

        var list = document.getElementById('checksList');
        list.textContent = '';

        var frag = document.createDocumentFragment();
        var dateLocale = GG.getDateLocale();

        (d.checks || []).forEach(function(c) {
            var safeStatus = GG.VALID_STATUSES.includes(c.status) ? c.status : 'skip';
            var meta = GG.CHECK_METADATA[c.check_type] || { source: 'Base oficial', id_field: null };
            var updated = c.last_updated || null;

            var row = document.createElement('div');
            row.className = 'check-row ' + safeStatus;

            var header = document.createElement('div');
            header.className = 'check-header';
            header.onclick = function() { row.classList.toggle('open'); if (window.flashCurrentGraphic) window.flashCurrentGraphic(); };

            var checkLeft = document.createElement('div');
            checkLeft.className = 'check-left';
            var statusIcon = document.createElement('div');
            statusIcon.className = 'check-status-icon ' + safeStatus;
            if (safeStatus === 'skip') {
                var dash = document.createElement('span');
                dash.style.opacity = '0.5';
                dash.textContent = '\u2014';
                statusIcon.appendChild(dash);
            } else {
                var iconId = safeStatus === 'fail' ? 'x' : safeStatus === 'warning' ? 'warning' : 'check';
                statusIcon.appendChild(GG.createSvgIcon(iconId));
            }
            var checkName = document.createElement('span');
            checkName.className = 'check-name';
            checkName.textContent = GG.fmtCheckType(c.check_type);
            checkLeft.appendChild(statusIcon);
            checkLeft.appendChild(checkName);

            var checkRight = document.createElement('div');
            checkRight.className = 'check-right';
            var badge = document.createElement('span');
            badge.className = 'check-badge ' + safeStatus;
            badge.textContent = GG.fmtCheckStatusBadge(c.status);
            var arrow = document.createElement('span');
            arrow.className = 'check-arrow';
            arrow.textContent = '\u25BC';
            checkRight.appendChild(badge);
            checkRight.appendChild(arrow);

            header.appendChild(checkLeft);
            header.appendChild(checkRight);
            row.appendChild(header);

            var details = document.createElement('div');
            details.className = 'check-details';

            var msgP = document.createElement('p');
            msgP.textContent = GG.translateBackendMessage(c.message || '');
            details.appendChild(msgP);

            if ((c.overlap_area_ha || 0) > 0) {
                var area = Number(c.overlap_area_ha);
                var pct = Number(c.overlap_percentage || 0);
                var overlapBox = document.createElement('div');
                overlapBox.className = 'check-overlap-box';
                var strongEl = document.createElement('strong');
                strongEl.textContent = GG.t('affectedAreaLabel');
                overlapBox.appendChild(strongEl);
                overlapBox.appendChild(document.createTextNode(' ' + GG.fmtArea(area) + ' (' + GG.fmtPct(pct) + ' ' + GG.t('ofTotalArea') + ')'));
                details.appendChild(overlapBox);
            }

            var metaDiv = document.createElement('div');
            metaDiv.className = 'check-meta';
            var srcRow = document.createElement('div');
            srcRow.className = 'check-meta-row';
            var srcStrong = document.createElement('strong');
            srcStrong.textContent = GG.t('sourceLabel');
            srcRow.appendChild(srcStrong);
            srcRow.appendChild(document.createTextNode(' ' + meta.source));
            metaDiv.appendChild(srcRow);

            var dateRow = document.createElement('div');
            dateRow.className = 'check-meta-row';
            var dateStrong = document.createElement('strong');
            dateStrong.textContent = GG.t('updatedLabel');
            dateRow.appendChild(dateStrong);
            if (updated) {
                dateRow.appendChild(document.createTextNode(' ' + new Date(updated).toLocaleDateString(dateLocale)));
                var agoSpan = document.createElement('span');
                agoSpan.className = 'freshness-ago-inline';
                agoSpan.textContent = GG.fmtDaysAgo(updated);
                dateRow.appendChild(agoSpan);
            } else {
                dateRow.appendChild(document.createTextNode(' --'));
            }
            metaDiv.appendChild(dateRow);

            if (meta.id_field && c[meta.id_field]) {
                var idRow = document.createElement('div');
                idRow.className = 'check-meta-row';
                var idStrong = document.createElement('strong');
                idStrong.textContent = GG.t('officialIdLabel');
                idRow.appendChild(idStrong);
                idRow.appendChild(document.createTextNode(' ' + c[meta.id_field]));
                metaDiv.appendChild(idRow);
            }
            details.appendChild(metaDiv);

            if ((c.overlap_area_ha || 0) > 0) {
                var safeCheckType = GG.CHECK_METADATA[c.check_type] ? c.check_type : 'unknown';
                var hlBtn = document.createElement('button');
                hlBtn.className = 'btn-highlight-map';
                hlBtn.appendChild(GG.createSvgIcon('map', 'icon-sm'));
                hlBtn.appendChild(document.createTextNode(' ' + GG.t('highlightOnMap')));
                hlBtn.onclick = function(e) { GG.highlightOnMap(safeCheckType, e); };
                details.appendChild(hlBtn);
            }

            row.appendChild(details);
            frag.appendChild(row);
        });

        list.appendChild(frag);

        document.getElementById('metaTime').textContent = (d.processing_time_ms != null ? d.processing_time_ms : '--') + 'ms';
        document.getElementById('metaDate').textContent = d.validated_at ? new Date(d.validated_at).toLocaleString('pt-BR') : '--';

        GG.updateColor(d.status);
        document.getElementById('resultCard').scrollIntoView({ behavior: 'smooth' });
    }

    function validate() {
        var now = Date.now();
        if (now - GG.lastValidationTime < GG.VALIDATION_COOLDOWN_MS) {
            var secs = Math.ceil((GG.VALIDATION_COOLDOWN_MS - (now - GG.lastValidationTime)) / 1000);
            GG.showToast(GG.t('rateLimitMessage').replace('{seconds}', secs), 'error');
            return;
        }

        var key = document.getElementById('apiKey').value.trim();

        var exampleArea = isKnownExampleArea(GG.currentPolygon);
        if (!key && !exampleArea) {
            var toastMsg = GG.t('apiKeyRequiredToast');
            var toastLink = GG.t('getApiKeyLink');
            GG.showToast(toastMsg, 'error', { text: toastLink, href: '#', onclick: function(e) { e.preventDefault(); window.openRegisterModal(); } });
            return;
        }

        if (!GG.currentPolygon) { GG.showToast(GG.t('noPolygon')); return; }

        if (exampleArea && !key) {
            GG.showToast(GG.t('validatingSampleArea'), 'info');
        }

        if (GG.cookieConsentGiven && key) {
            localStorage.setItem('gg_api_key', key);
        }

        GG.lastValidationTime = now;

        document.getElementById('loadingOverlay').classList.add('show');
        document.getElementById('validateBtn').disabled = true;

        var steps = [
            GG.t('stepAnalyzingProdes'),
            GG.t('stepCheckingMapbiomas'),
            GG.t('stepConsultingTi'),
            GG.t('stepCheckingEmbargoes'),
            GG.t('stepAnalyzingUcs'),
            GG.t('stepProcessing')
        ];
        var si = 0;
        var iv = setInterval(function() { if (si < steps.length) document.getElementById('loadingStep').textContent = steps[si++]; }, 2000);

        var headers = { 'Content-Type': 'application/json' };
        if (key) headers['x-api-key'] = key;

        var endpoint = key ? '/api/v1/validations/validate' : '/api/v1/validations/quick';

        fetch(GG.API_URL + endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(GG.currentPolygon)
        }).then(function(res) {
            clearInterval(iv);
            return res.json().then(function(data) {
                if (res.status === 429) {
                    GG.showToast(GG.t('error_quota_exceeded'), 'error', {
                        text: GG.t('error_quota_contact'),
                        href: 'mailto:greengatebrasil@gmail.com?subject=Aumentar Cota Mensal GreenGate'
                    });
                    throw { _handled: true };
                }

                if (res.status === 401 || res.status === 403) {
                    GG.showToast(GG.t('error_invalid_key'), 'error', {
                        text: GG.t('error_quota_contact'),
                        href: 'mailto:greengatebrasil@gmail.com?subject=Problema com API Key GreenGate'
                    });
                    throw { _handled: true };
                }

                if (res.status === 400) {
                    throw new Error(GG.t('error_invalid_geometry'));
                }

                if (res.status >= 500) {
                    console.error('Backend error:', data);
                    throw new Error(GG.t('error_server'));
                }

                if (!res.ok) {
                    throw new Error(GG.t('error_generic'));
                }

                GG.saveHistory(data, parseFloat(document.getElementById('areaValue').textContent));
                showResult(data);
            });
        }).catch(function(err) {
            clearInterval(iv);
            if (err && err._handled) { /* already shown */ }
            else {
                var errorMessage = err.message || '';
                if (errorMessage.indexOf('fetch') !== -1 || errorMessage.indexOf('Failed') !== -1 || errorMessage.indexOf('NetworkError') !== -1 || errorMessage.indexOf('TypeError') !== -1) {
                    errorMessage = GG.t('error_connection');
                    console.error('Network error details:', err);
                }
                GG.showToast(errorMessage);
            }
        }).finally(function() {
            document.getElementById('loadingOverlay').classList.remove('show');
            GG.setValidateAvailability();
        });
    }

    // Attach to namespace
    GG.validate = validate;
    GG.showResult = showResult;
    GG.displayDataFreshness = displayDataFreshness;
    GG.isKnownExampleArea = isKnownExampleArea;

    // Window exports
    window.showResult = showResult;
})();
