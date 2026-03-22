/**
 * GG Storage — cookie consent, API key, history CRUD.
 * Depende de: gg-namespace.js, gg-helpers.js
 */
(function() {
    'use strict';

    // One-time migration from old XOR-encrypted key
    (function migrateOldKey() {
        var enc = localStorage.getItem('gg_api_key_enc');
        if (!enc) return;
        try {
            var k = 'GG_' + navigator.userAgent.substring(0, 20);
            var decoded = atob(enc);
            var plain = '';
            for (var i = 0; i < decoded.length; i++) {
                plain += String.fromCharCode(decoded.charCodeAt(i) ^ k.charCodeAt(i % k.length));
            }
            if (plain && /^[a-zA-Z0-9_-]+$/.test(plain)) {
                localStorage.setItem('gg_api_key', plain);
            }
        } catch (_) {}
        localStorage.removeItem('gg_api_key_enc');
    })();

    // GDPR Cookie Consent
    GG.cookieConsentGiven = localStorage.getItem('gg_cookie_consent') === 'true';

    function acceptCookies() {
        localStorage.setItem('gg_cookie_consent', 'true');
        GG.cookieConsentGiven = true;
        document.getElementById('cookieConsent').classList.remove('show');
        loadGA();
    }

    function rejectCookies() {
        localStorage.removeItem('gg_cookie_consent');
        localStorage.removeItem('gg_api_key');
        localStorage.removeItem('gg_history');
        localStorage.removeItem('gg_tutorial');
        GG.cookieConsentGiven = false;
        document.getElementById('cookieConsent').classList.remove('show');
        GG.showToast('Data cleared. API key will not be saved.', 'info');
    }

    // Show consent banner or load GA
    window.addEventListener('DOMContentLoaded', function() {
        if (GG.cookieConsentGiven) {
            loadGA();
        } else if (!localStorage.getItem('gg_cookie_consent')) {
            setTimeout(function() {
                document.getElementById('cookieConsent').classList.add('show');
            }, GG.CONSENT_BANNER_DELAY_MS);
        }
    });

    // History
    function getHistory() {
        try { return JSON.parse(localStorage.getItem('gg_history') || '[]'); }
        catch(e) { return []; }
    }

    function saveHistory(result, area) {
        var conf = GG.clampConf(result.risk_score);
        var h = getHistory();
        h.unshift({
            id: Date.now(),
            status: result.status,
            score: conf,
            area: area,
            date: new Date().toISOString(),
            polygon: GG.currentPolygon,
            meta: GG.currentMeta
        });
        if (h.length > GG.MAX_HISTORY) h.pop();
        localStorage.setItem('gg_history', JSON.stringify(h));
        renderHistory();
    }

    function renderHistory() {
        var el = document.getElementById('historyList');
        var h = getHistory();
        el.textContent = '';

        if (!h.length) {
            var emptyDiv = document.createElement('div');
            emptyDiv.className = 'history-empty';
            emptyDiv.appendChild(document.createTextNode(GG.t('historyEmpty')));

            var ctaBtn = document.createElement('button');
            ctaBtn.className = 'history-empty-cta';
            ctaBtn.onclick = function() { document.getElementById('testExampleBtn').click(); };

            var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            iconSvg.setAttribute('class', 'icon-sm');
            var useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            useEl.setAttribute('href', '#icon-target');
            iconSvg.appendChild(useEl);
            ctaBtn.appendChild(iconSvg);
            ctaBtn.appendChild(document.createTextNode(' ' + GG.t('sampleBtn')));

            emptyDiv.appendChild(ctaBtn);
            el.appendChild(emptyDiv);
            return;
        }

        var locale = window.getCurrentAppLang ? (window.getCurrentAppLang() === 'en' ? 'en-US' : 'pt-BR') : 'pt-BR';
        var complianceText = GG.t('compliance');

        h.forEach(function(i) {
            var item = document.createElement('div');
            item.className = 'history-item';
            item.dataset.id = i.id;

            var header = document.createElement('div');
            header.className = 'history-header';

            var statusSpan = document.createElement('span');
            statusSpan.className = 'history-status ' + (i.status || '');
            statusSpan.textContent = GG.fmtHistoryStatusLabel(i.status);

            var dateSpan = document.createElement('span');
            dateSpan.className = 'history-date';
            dateSpan.textContent = new Date(i.date).toLocaleDateString(locale);

            header.appendChild(statusSpan);
            header.appendChild(dateSpan);

            var info = document.createElement('div');
            info.className = 'history-info';
            var area = Number(i.area) || 0;
            var score = Number(i.score) || 0;
            info.textContent = area.toFixed(1) + ' ha \u2022 ' + complianceText + ' ' + score + '/100';

            item.appendChild(header);
            item.appendChild(info);

            item.onclick = function() {
                var found = h.find(function(x) { return x.id === +item.dataset.id; });
                if (found && found.polygon) {
                    GG.currentMeta = found.meta || { municipality: null, state: null, address: null };
                    window.loadGeoJSON(found.polygon);
                    GG.showToast(GG.t('polygonLoaded'), 'success');
                }
            };

            el.appendChild(item);
        });
    }

    // Clear all
    function clearAll() {
        if (GG.sketchVM) GG.sketchVM.cancel();
        GG.currentPolygon = null;
        GG.currentGraphic = null;
        GG.currentMeta = { municipality: null, state: null, address: null };
        GG.currentValidationResult = null;

        if (GG.graphicsLayer) GG.graphicsLayer.removeAll();
        if (GG.overlapsLayer) GG.overlapsLayer.removeAll();

        var ai = document.getElementById('areaInfo');
        ai.classList.remove('show', 'limit-exceeded');

        document.getElementById('areaValue').textContent = '0';
        document.getElementById('areaCoords').textContent = '';
        document.getElementById('areaMeta').textContent = '';

        document.getElementById('resultCard').classList.remove('show');
        document.getElementById('uploadArea').classList.remove('has-file');
        document.getElementById('fileName').classList.remove('show');
        document.getElementById('fileInput').value = '';
        document.getElementById('drawBtn').classList.remove('active');
        document.getElementById('drawOptions').classList.remove('show');

        GG.setValidateAvailability();
    }

    // Init: load API key, render history
    document.addEventListener('DOMContentLoaded', function() {
        if (GG.cookieConsentGiven) {
            var savedKey = localStorage.getItem('gg_api_key');
            if (savedKey) document.getElementById('apiKey').value = savedKey;
        }
        renderHistory();
    });

    // Attach to namespace
    GG.acceptCookies = acceptCookies;
    GG.rejectCookies = rejectCookies;
    GG.getHistory = getHistory;
    GG.saveHistory = saveHistory;
    GG.renderHistory = renderHistory;
    GG.clearAll = clearAll;

    // Window exports
    window.acceptCookies = acceptCookies;
    window.rejectCookies = rejectCookies;
    window.renderHistory = renderHistory;
})();
