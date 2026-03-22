/**
 * GG Helpers — funcoes puras e utilitarios de UI.
 * Depende de: gg-namespace.js
 */
(function() {
    'use strict';

    function t(key) {
        return window.getAppTranslation ? window.getAppTranslation(key) : key;
    }

    function createSvgIcon(iconId, className) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', className || 'icon');
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#icon-' + iconId);
        svg.appendChild(use);
        return svg;
    }

    function escapeHtml(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function clampConf(x) {
        var n = Number(x);
        if (!Number.isFinite(n)) return 0;
        return Math.max(0, Math.min(100, n));
    }

    function confLabel(conf) {
        if (conf >= 90) return 'Excelente';
        if (conf >= 70) return 'Bom';
        if (conf >= 40) return 'Regular';
        return 'Crítico';
    }

    function fmtArea(area) {
        if (area >= 0.01) return area.toFixed(2) + ' ha';
        if (area >= 0.0001) return area.toFixed(4) + ' ha';
        return '< 0.0001 ha';
    }

    function fmtPct(pct) {
        if (pct >= 1) return pct.toFixed(1) + '%';
        if (pct >= 0.01) return pct.toFixed(2) + '%';
        if (pct > 0) return '< 0.01%';
        return '0%';
    }

    function fmtDaysAgo(dateStr) {
        if (!dateStr || dateStr === '--') return '';
        var diffDays = Math.ceil(Math.abs(Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return ' (' + t('timeToday').toLowerCase() + ')';
        if (diffDays === 1) return ' (' + t('timeYesterday').toLowerCase() + ')';
        if (diffDays < 30) return ' (' + diffDays + ' ' + t('timeDaysAgo') + ')';
        var months = Math.floor(diffDays / 30);
        return ' (' + months + ' ' + (months === 1 ? t('timeMonth') : t('timeMonths')) + ')';
    }

    function getDateLocale() {
        return (localStorage.getItem('app_language') || 'pt') === 'en' ? 'en-US' : 'pt-BR';
    }

    function translateBackendMessage(msg) {
        if (!msg) return '';

        var patterns = [
            { pattern: /^Sobreposição com área desmatada pós-2020 \(PRODES\):?\s*/i, key: 'msg_overlap_prodes', hasValue: true },
            { pattern: /^Nenhuma sobreposição com desmatamento PRODES pós-2020$/i, key: 'msg_no_overlap_prodes', hasValue: false },
            { pattern: /^Sobreposição com alerta MapBiomas pós-2020:?\s*/i, key: 'msg_overlap_mapbiomas', hasValue: true },
            { pattern: /^Nenhuma sobreposição com alertas MapBiomas pós-2020$/i, key: 'msg_no_overlap_mapbiomas', hasValue: false },
            { pattern: /^Sobreposição com Terra Indígena:?\s*/i, key: 'msg_overlap_ti', hasValue: true },
            { pattern: /^Nenhuma sobreposição com Terra Indígena$/i, key: 'msg_no_overlap_ti', hasValue: false },
            { pattern: /^Sobreposição com área embargada IBAMA:?\s*/i, key: 'msg_overlap_embargo', hasValue: true },
            { pattern: /^Nenhuma sobreposição com embargo IBAMA ativo$/i, key: 'msg_no_overlap_embargo', hasValue: false },
            { pattern: /^Sobreposição com Território Quilombola:?\s*/i, key: 'msg_overlap_quilombola', hasValue: true },
            { pattern: /^Nenhuma sobreposição com Território Quilombola$/i, key: 'msg_no_overlap_quilombola', hasValue: false },
            { pattern: /^Sobreposição com UC de Proteção Integral:?\s*/i, key: 'msg_overlap_uc_integral', hasValue: true },
            { pattern: /^Sobreposição com UC de Uso Sustentável:?\s*/i, key: 'msg_overlap_uc_sustentavel', hasValue: true },
            { pattern: /^Nenhuma sobreposição com Unidade de Conservação$/i, key: 'msg_no_overlap_uc', hasValue: false },
        ];

        for (var i = 0; i < patterns.length; i++) {
            var p = patterns[i];
            if (p.pattern.test(msg)) {
                if (p.hasValue) {
                    var value = msg.replace(p.pattern, '');
                    return t(p.key) + ' ' + value;
                } else {
                    return t(p.key);
                }
            }
        }

        return msg;
    }

    function fmtCheckType(c) {
        var mapping = {
            deforestation_prodes: t('check_deforestation_prodes'),
            deforestation_deter: t('check_deforestation_deter'),
            deforestation_mapbiomas: t('check_deforestation_mapbiomas'),
            terra_indigena: t('check_terra_indigena'),
            embargo_ibama: t('check_embargo_ibama'),
            quilombola: t('check_quilombola'),
            uc: t('check_uc'),
            queimadas: t('check_queimadas'),
            app_hidrografia: t('check_app_hidrografia'),
            floresta_publica: t('check_floresta_publica'),
            concessao_florestal: t('check_concessao_florestal'),
            sicar_status: t('check_sicar_status'),
            pivos_irrigacao: t('check_pivos_irrigacao'),
            app_water: t('check_app_water'),
            legal_amazon: t('check_legal_amazon')
        };
        return mapping[c] || escapeHtml(c);
    }

    function fmtCheckStatusBadge(s) {
        var mapping = {
            pass: t('statusApproved'),
            fail: t('statusRejected'),
            warning: t('statusWarning'),
            skip: 'N/A'
        };
        return mapping[s] || escapeHtml(s);
    }

    function fmtHistoryStatusLabel(s) {
        var mapping = { approved: 'OK', rejected: 'FAIL' };
        return mapping[s] || 'WARN';
    }

    function showToast(m, type, link) {
        type = type || 'error';
        var el = document.getElementById('toast');
        var message = typeof m === 'object' ? (m.detail || m.message || 'Erro') : m;

        el.textContent = '';
        el.appendChild(document.createTextNode(message));

        if (link && link.href && link.text) {
            el.appendChild(document.createTextNode(' '));
            var a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if (link.onclick) a.onclick = link.onclick;
            el.appendChild(a);
        }

        el.className = 'toast ' + type;
        el.classList.add('show');
        setTimeout(function() { el.classList.remove('show'); },
            type === 'error' ? GG.TOAST_DURATION_ERROR_MS : GG.TOAST_DURATION_MS);
    }

    function setValidateAvailability() {
        var ai = document.getElementById('areaInfo');
        var overLimit = ai.classList.contains('limit-exceeded');
        document.getElementById('validateBtn').disabled = !(GG.currentPolygon && !overLimit);
    }

    // Attach to namespace
    GG.t = t;
    GG.createSvgIcon = createSvgIcon;
    GG.escapeHtml = escapeHtml;
    GG.clampConf = clampConf;
    GG.confLabel = confLabel;
    GG.fmtArea = fmtArea;
    GG.fmtPct = fmtPct;
    GG.fmtDaysAgo = fmtDaysAgo;
    GG.getDateLocale = getDateLocale;
    GG.translateBackendMessage = translateBackendMessage;
    GG.fmtCheckType = fmtCheckType;
    GG.fmtCheckStatusBadge = fmtCheckStatusBadge;
    GG.fmtHistoryStatusLabel = fmtHistoryStatusLabel;
    GG.showToast = showToast;
    GG.setValidateAvailability = setValidateAvailability;

    // Window exports for HTML onclick and cross-script access
    window.createSvgIcon = createSvgIcon;
})();
