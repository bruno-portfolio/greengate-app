// Traduções para app.html (elementos críticos)
const appTranslations = {
    pt: {
        // Header
        title: 'Plataforma de Diligência Prévia Ambiental',
        subtitle: 'Plataforma de Diligência Prévia',
        status: 'Sistema Ativo',

        // Buttons
        drawBtn: 'Desenhar',
        clearBtn: 'Limpar',
        validateBtn: 'Validar Área',
        exportBtn: 'Exportar GeoJSON',
        pdfBtn: 'Baixar Relatório PDF',
        confirmPdfBtn: 'Gerar Relatório PDF',
        sampleBtn: 'Testar com Área de Exemplo',
        clearHistory: 'Limpar',

        // Search
        searchPlaceholder: 'Buscar cidade ou estado...',

        // Area info
        areaLabel: 'Área Selecionada',
        areaLimit: 'Limite: 10.000 ha',

        // Steps
        step1Title: 'Navegue e Defina a Área',
        step1Text: 'Use a busca, desenhe com o <strong>Lápis</strong>, faça upload ou teste com área de exemplo. <span style="color:var(--accent-yellow); font-size:0.75rem;">Limite: 10.000 ha.</span>',
        step2Title: 'Validação Automática',
        step2Text: 'Clique em <strong>Validar Área</strong> para cruzamento instantâneo com 13 bases oficiais (PRODES, DETER, MapBiomas, TIs, Embargos, UCs, Queimadas, etc).',
        step3Title: 'Relatório PDF',
        step3Text: 'Baixe o relatório profissional com mapas, verificações detalhadas e QR Code de autenticidade. <strong>Requer API Key</strong>.',

        // Map legend
        legendTitle: 'Legenda',
        legendNeutral: 'Área Desenhada',
        legendApproved: 'Aprovado',
        legendRejected: 'Rejeitado',
        legendWarning: 'Atenção',

        // Data Freshness
        dataFreshness: 'Atualização dos Dados',

        // PDF Modal
        pdfModalTitle: 'Gerar Relatório PDF',
        pdfApiKeyLabel: 'API Key (obrigatória para PDF)',
        pdfApiKeyPlaceholder: 'Digite sua API key...',
        pdfPropertyLabel: 'Nome da Propriedade (opcional)',
        pdfPropertyPlaceholder: 'Ex: Fazenda Santa Rita',
        pdfPlotLabel: 'Nome do Talhão (opcional)',
        pdfPlotPlaceholder: 'Ex: Talhão 12',
        pdfLangLabel: 'Idioma do Relatório',
        pdfLangPt: 'Português',
        pdfLangEn: 'English',

        // Messages
        sampleLoaded: 'Área de exemplo carregada! Clique em "Validar Área" para testar sem API Key.',
        clearHistoryConfirm: 'Limpar histórico?',
        areaFileName: 'Área de Exemplo (Sinop, MT) - Validação livre',
        overlapLabel: 'Área Afetada:',

        statusProcessing: 'Validando...',

        // Check items
        checkProdes: 'Desmatamento PRODES',
        checkMapbiomas: 'Alertas MapBiomas',
        checkIndigenous: 'Terras Indígenas',
        checkEmbargoes: 'Embargos IBAMA',
        checkQuilombola: 'Territórios Quilombolas',
        checkConservation: 'Unidades de Conservação',
        checkAmazon: 'Amazônia Legal',
        checkApp: 'Áreas de Preservação',

        // Sidebar cards
        authTitle: 'Autenticação',
        apiKeyPlaceholder: 'Cole sua API Key',
        apiKeyRequired: 'Explore o mapa gratuitamente! API Key necessária apenas para validar suas áreas.',
        getApiKey: 'Obtenha sua chave:',
        getApiKeyFree: 'Obter API Key Grátis',

        // Trust signals footer
        encryptedData: 'Dados Criptografados',
        certifiedSources: 'Fontes Oficiais Certificadas',

        // Register modal
        registerModalTitle: 'Obter API Key Grátis',
        registerEmailLabel: 'Seu email',
        freeValidations: '3 validações gratuitas',
        noCreditCard: 'Sem cartão de crédito',
        instantApiKey: 'API key instantânea',

        // Toast messages
        apiKeyRequiredToast: 'API Key necessária.',
        getApiKeyLink: 'Obter API Key Grátis →',
        uploadTitle: 'Upload de Arquivo',
        uploadText: 'Toque para selecionar',
        uploadHint: 'GeoJSON ou JSON',
        historyTitle: 'Histórico',

        // Dynamic messages
        noPolygon: 'Nenhum polígono',
        polygonLoaded: 'Polígono carregado',
        geojsonExported: 'GeoJSON exportado!',
        validatingArea: 'Validando área...',
        connecting: 'Conectando',
        searching: 'Buscando...',
        noResults: 'Nenhum resultado',
        searchError: 'Erro na busca',
        historyEmpty: 'Nenhuma validação ainda',
        fillFarmPlot: 'Preencha Fazenda e Talhão',
        insertApiKey: 'Insira sua API Key para gerar o PDF',
        pdfGenerating: 'Gerando...',
        pdfError: 'Erro ao gerar PDF',
        pdfSuccess: 'PDF gerado com sucesso!',
        errorUpload: 'Erro: ',
        compliance: 'Conformidade:',

        // Validation results
        statusApproved: 'Conforme',
        statusRejected: 'Não Conforme',
        statusWarning: 'Atenção',
        affectedArea: 'Área Afetada',

        // Check names
        check_deforestation_prodes: 'Desmatamento PRODES',
        check_deforestation_deter: 'Alertas DETER',
        check_deforestation_mapbiomas: 'Alertas MapBiomas',
        check_terra_indigena: 'Terras Indígenas',
        check_quilombola: 'Territórios Quilombolas',
        check_uc: 'Unidades de Conservação',
        check_embargo_ibama: 'Embargos IBAMA',
        check_queimadas: 'Queimadas',
        check_app_hidrografia: 'APP Hidrografia',
        check_floresta_publica: 'Floresta Pública',
        check_concessao_florestal: 'Concessão Florestal',
        check_sicar_status: 'CAR/SICAR',
        check_pivos_irrigacao: 'Pivôs de Irrigação',
        check_app_water: 'APP (Água)',
        check_legal_amazon: 'Amazônia Legal',

        // Layer names (data freshness)
        layer_prodes: 'PRODES (Desmatamento)',
        layer_deter: 'DETER (Alertas)',
        layer_embargo_ibama: 'Embargos IBAMA',
        layer_terra_indigena: 'Terras Indígenas',
        layer_uc: 'Unidades de Conservação',
        layer_quilombola: 'Territórios Quilombolas',
        layer_queimadas: 'Queimadas',
        layer_hidrografia: 'Hidrografia (APP)',
        layer_floresta_publica: 'Floresta Pública',
        layer_concessao_florestal: 'Concessão Florestal',
        layer_sicar: 'CAR/SICAR',
        layer_pivos: 'Pivôs de Irrigação',
        layer_mapbiomas: 'MapBiomas',

        // Time expressions
        timeToday: 'Hoje',
        timeYesterday: 'Ontem',
        timeDaysAgo: 'dias atrás',
        timeWeeksAgo: 'semanas atrás',
        timeMonthsAgo: 'meses atrás',
        timeMonth: 'mês',
        timeMonths: 'meses',

        // Result details
        affectedAreaLabel: 'Área Afetada:',
        ofTotalArea: 'da área total',
        sourceLabel: 'Fonte:',
        updatedLabel: 'Atualizado:',
        officialIdLabel: 'ID Oficial:',
        overlapArea: 'Área de sobreposição:',
        highlightOnMap: 'Destacar no Mapa',

        // Backend messages (para manter consistência)
        msg_overlap_prodes: 'Sobreposição com área desmatada pós-2020 (PRODES):',
        msg_no_overlap_prodes: 'Nenhuma sobreposição com desmatamento PRODES pós-2020',
        msg_overlap_mapbiomas: 'Sobreposição com alerta MapBiomas pós-2020:',
        msg_no_overlap_mapbiomas: 'Nenhuma sobreposição com alertas MapBiomas pós-2020',
        msg_overlap_ti: 'Sobreposição com Terra Indígena:',
        msg_no_overlap_ti: 'Nenhuma sobreposição com Terra Indígena',
        msg_overlap_embargo: 'Sobreposição com área embargada IBAMA:',
        msg_no_overlap_embargo: 'Nenhuma sobreposição com embargo IBAMA ativo',
        msg_overlap_quilombola: 'Sobreposição com Território Quilombola:',
        msg_no_overlap_quilombola: 'Nenhuma sobreposição com Território Quilombola',
        msg_overlap_uc_integral: 'Sobreposição com UC de Proteção Integral:',
        msg_overlap_uc_sustentavel: 'Sobreposição com UC de Uso Sustentável:',
        msg_no_overlap_uc: 'Nenhuma sobreposição com Unidade de Conservação',

        // PDF Modal - Privacy tip
        privacyTipTitle: 'Dica de Privacidade:',
        privacyTipText: 'Use identificadores internos (ex: "Fazenda #12345") ao invés de nomes reais. Nomes de propriedades aparecem no relatório PDF mas são redatados na verificação pública.',
        reportIncludesQr: 'O relatório incluirá QR Code para verificação de autenticidade',

        // Error messages
        rateLimitMessage: 'Aguarde {seconds} segundos entre validações',
        error_quota_exceeded: 'Cota de validações esgotada.',
        error_quota_contact: 'Solicitar aumento →',
        error_invalid_key: 'API Key inválida ou expirada.',
        error_invalid_geometry: 'Geometria inválida. Redesenhe o polígono.',
        error_server: 'Erro no servidor. Tente novamente em instantes.',
        error_generic: 'Erro inesperado. Tente novamente.',
        error_connection: 'Erro de conexão. Verifique sua internet.',

        // Validation loading steps
        validatingSampleArea: 'Validando área de exemplo (sem API Key). Para suas áreas reais, obtenha uma chave.',
        stepAnalyzingProdes: 'Analisando PRODES...',
        stepCheckingMapbiomas: 'Verificando MapBiomas...',
        stepConsultingTi: 'Consultando TIs...',
        stepCheckingEmbargoes: 'Verificando Embargos...',
        stepAnalyzingUcs: 'Analisando UCs...',
        stepProcessing: 'Processando...',
    },
    en: {
        // Header
        title: 'Environmental Due Diligence Platform',
        subtitle: 'Due Diligence Platform',
        status: 'System Active',

        // Buttons
        drawBtn: 'Draw',
        clearBtn: 'Clear',
        validateBtn: 'Validate Area',
        exportBtn: 'Export GeoJSON',
        pdfBtn: 'Download PDF Report',
        confirmPdfBtn: 'Generate PDF Report',
        sampleBtn: 'Test with Sample Area',
        clearHistory: 'Clear',

        // Search
        searchPlaceholder: 'Search city or state...',

        // Area info
        areaLabel: 'Selected Area',
        areaLimit: 'Limit: 10,000 ha',

        // Steps
        step1Title: 'Navigate and Define Area',
        step1Text: 'Use search, draw with <strong>Pencil</strong>, upload or test with sample area. <span style="color:var(--accent-yellow); font-size:0.75rem;">Limit: 10,000 ha.</span>',
        step2Title: 'Automatic Validation',
        step2Text: 'Click <strong>Validate Area</strong> for instant cross-check with 13 official databases (PRODES, DETER, MapBiomas, Indigenous Lands, Embargoes, Fire Hotspots, etc).',
        step3Title: 'PDF Report',
        step3Text: 'Download professional report with maps, detailed checks and authenticity QR Code. <strong>Requires API Key</strong>.',

        // Map legend
        legendTitle: 'Legend',
        legendNeutral: 'Drawn Area',
        legendApproved: 'Approved',
        legendRejected: 'Rejected',
        legendWarning: 'Warning',

        // Data Freshness
        dataFreshness: 'Data Freshness',

        // PDF Modal
        pdfModalTitle: 'Generate PDF Report',
        pdfApiKeyLabel: 'API Key (required for PDF)',
        pdfApiKeyPlaceholder: 'Enter your API key...',
        pdfPropertyLabel: 'Property Name (optional)',
        pdfPropertyPlaceholder: 'Ex: Santa Rita Farm',
        pdfPlotLabel: 'Plot Name (optional)',
        pdfPlotPlaceholder: 'Ex: Plot 12',
        pdfLangLabel: 'Report Language',
        pdfLangPt: 'Português',
        pdfLangEn: 'English',

        // Messages
        sampleLoaded: 'Sample area loaded! Click "Validate Area" to test without API Key.',
        clearHistoryConfirm: 'Clear history?',
        areaFileName: 'Sample Area (Sinop, MT) - Free validation',
        overlapLabel: 'Affected Area:',

        statusProcessing: 'Validating...',

        // Check items
        checkProdes: 'PRODES Deforestation',
        checkMapbiomas: 'MapBiomas Alerts',
        checkIndigenous: 'Indigenous Lands',
        checkEmbargoes: 'IBAMA Embargoes',
        checkQuilombola: 'Quilombola Territories',
        checkConservation: 'Conservation Units',
        checkAmazon: 'Legal Amazon',
        checkApp: 'Preservation Areas',

        // Sidebar cards
        authTitle: 'Authentication',
        apiKeyPlaceholder: 'Paste your API Key',
        apiKeyRequired: 'Explore the map for free! API Key required only to validate your areas.',
        getApiKey: 'Get your key:',
        getApiKeyFree: 'Get Free API Key',

        // Trust signals footer
        encryptedData: 'Encrypted Data',
        certifiedSources: 'Certified Official Sources',

        // Register modal
        registerModalTitle: 'Get Free API Key',
        registerEmailLabel: 'Your email',
        freeValidations: '3 free validations',
        noCreditCard: 'No credit card required',
        instantApiKey: 'Instant API key',

        // Toast messages
        apiKeyRequiredToast: 'API Key required.',
        getApiKeyLink: 'Get Free API Key →',
        uploadTitle: 'File Upload',
        uploadText: 'Tap to select',
        uploadHint: 'GeoJSON or JSON',
        historyTitle: 'History',

        // Dynamic messages
        noPolygon: 'No polygon',
        polygonLoaded: 'Polygon loaded',
        geojsonExported: 'GeoJSON exported!',
        validatingArea: 'Validating area...',
        connecting: 'Connecting',
        searching: 'Searching...',
        noResults: 'No results',
        searchError: 'Search error',
        historyEmpty: 'No validations yet',
        fillFarmPlot: 'Fill in Farm and Plot',
        insertApiKey: 'Insert your API Key to generate PDF',
        pdfGenerating: 'Generating...',
        pdfError: 'Error generating PDF',
        pdfSuccess: 'PDF generated successfully!',
        errorUpload: 'Error: ',
        compliance: 'Compliance:',

        // Validation results
        statusApproved: 'Compliant',
        statusRejected: 'Non-Compliant',
        statusWarning: 'Warning',
        affectedArea: 'Affected Area',

        // Check names
        check_deforestation_prodes: 'PRODES Deforestation',
        check_deforestation_deter: 'DETER Alerts',
        check_deforestation_mapbiomas: 'MapBiomas Alerts',
        check_terra_indigena: 'Indigenous Lands',
        check_quilombola: 'Quilombola Territories',
        check_uc: 'Conservation Units',
        check_embargo_ibama: 'IBAMA Embargoes',
        check_queimadas: 'Fire Hotspots',
        check_app_hidrografia: 'Riparian Buffer (APP)',
        check_floresta_publica: 'Public Forests',
        check_concessao_florestal: 'Forest Concessions',
        check_sicar_status: 'CAR/SICAR',
        check_pivos_irrigacao: 'Irrigation Pivots',
        check_app_water: 'APP (Water)',
        check_legal_amazon: 'Legal Amazon',

        // Layer names (data freshness)
        layer_prodes: 'PRODES (Deforestation)',
        layer_deter: 'DETER (Alerts)',
        layer_embargo_ibama: 'IBAMA Embargoes',
        layer_terra_indigena: 'Indigenous Lands',
        layer_uc: 'Conservation Units',
        layer_quilombola: 'Quilombola Territories',
        layer_mapbiomas: 'MapBiomas',
        layer_queimadas: 'Fire Hotspots',
        layer_hidrografia: 'Hydrography (APP)',
        layer_floresta_publica: 'Public Forests',
        layer_concessao_florestal: 'Forest Concessions',
        layer_sicar: 'CAR/SICAR',
        layer_pivos: 'Irrigation Pivots',

        // Time expressions
        timeToday: 'Today',
        timeYesterday: 'Yesterday',
        timeDaysAgo: 'days ago',
        timeWeeksAgo: 'weeks ago',
        timeMonthsAgo: 'months ago',
        timeMonth: 'month',
        timeMonths: 'months',

        // Result details
        affectedAreaLabel: 'Affected Area:',
        ofTotalArea: 'of total area',
        sourceLabel: 'Source:',
        updatedLabel: 'Updated:',
        officialIdLabel: 'Official ID:',
        overlapArea: 'Overlap area:',
        highlightOnMap: 'Highlight on Map',

        // Backend messages (translated)
        msg_overlap_prodes: 'Overlap with post-2020 deforested area (PRODES):',
        msg_no_overlap_prodes: 'No overlap with PRODES post-2020 deforestation',
        msg_overlap_mapbiomas: 'Overlap with post-2020 MapBiomas alert:',
        msg_no_overlap_mapbiomas: 'No overlap with MapBiomas post-2020 alerts',
        msg_overlap_ti: 'Overlap with Indigenous Land:',
        msg_no_overlap_ti: 'No overlap with Indigenous Land',
        msg_overlap_embargo: 'Overlap with IBAMA embargoed area:',
        msg_no_overlap_embargo: 'No overlap with active IBAMA embargo',
        msg_overlap_quilombola: 'Overlap with Quilombola Territory:',
        msg_no_overlap_quilombola: 'No overlap with Quilombola Territory',
        msg_overlap_uc_integral: 'Overlap with Strict Protection Conservation Unit:',
        msg_overlap_uc_sustentavel: 'Overlap with Sustainable Use Conservation Unit:',
        msg_no_overlap_uc: 'No overlap with Conservation Unit',

        // PDF Modal - Privacy tip
        privacyTipTitle: 'Privacy Tip:',
        privacyTipText: 'Use internal identifiers (e.g., "Farm #12345") instead of real names. Property names appear in the PDF report but are redacted in public verification.',
        reportIncludesQr: 'Report will include QR Code for authenticity verification',

        // Error messages
        rateLimitMessage: 'Please wait {seconds} seconds between validations',
        error_quota_exceeded: 'Validation quota exceeded.',
        error_quota_contact: 'Request increase →',
        error_invalid_key: 'Invalid or expired API Key.',
        error_invalid_geometry: 'Invalid geometry. Redraw the polygon.',
        error_server: 'Server error. Please try again shortly.',
        error_generic: 'Unexpected error. Please try again.',
        error_connection: 'Connection error. Check your internet.',

        // Validation loading steps
        validatingSampleArea: 'Validating sample area (no API Key). For your real areas, get a key.',
        stepAnalyzingProdes: 'Analyzing PRODES...',
        stepCheckingMapbiomas: 'Checking MapBiomas...',
        stepConsultingTi: 'Consulting Indigenous Lands...',
        stepCheckingEmbargoes: 'Checking Embargoes...',
        stepAnalyzingUcs: 'Analyzing Conservation Units...',
        stepProcessing: 'Processing...',
    }
};

// Sistema de tradução para app.html
(function() {
    let currentLang = localStorage.getItem('app_language') || 'pt';

    // Aplicar idioma inicial ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
        applyAppTranslations(currentLang);
        updateLangButton(currentLang);
    });

    // Função para aplicar traduções
    function applyAppTranslations(lang) {
        const t = appTranslations[lang];

        // Update document title
        document.title = t.title;

        // Update all elements with data-i18n-app attribute
        document.querySelectorAll('[data-i18n-app]').forEach(el => {
            const key = el.getAttribute('data-i18n-app');
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = t[key];
                } else if (el.hasAttribute('title')) {
                    el.setAttribute('title', t[key]);
                } else {
                    el.innerHTML = t[key];
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

        // Store preference
        localStorage.setItem('app_language', lang);
        currentLang = lang;
    }

    // Função para atualizar o botão de idioma
    function updateLangButton(lang) {
        const langBtn = document.getElementById('langToggleApp');
        if (langBtn) {
            langBtn.textContent = lang.toUpperCase();
        }
    }

    // Expor funções globalmente para o botão poder chamar
    window.toggleAppLanguage = function() {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        applyAppTranslations(newLang);
        updateLangButton(newLang);

        // Re-renderizar histórico com novo idioma
        if (typeof renderHistory === 'function') {
            renderHistory();
        }

        // Re-renderizar resultados de validação se existir
        if (window.currentValidationResult && typeof window.showResult === 'function') {
            window.showResult(window.currentValidationResult);
        }

        // Disparar evento customizado para outros componentes
        window.dispatchEvent(new CustomEvent('app-language-changed', { detail: { lang: newLang } }));
    };

    window.getCurrentAppLang = function() {
        return currentLang;
    };

    // Função para obter tradução de uma chave específica
    window.getAppTranslation = function(key) {
        return appTranslations[currentLang]?.[key] || appTranslations['pt'][key] || key;
    };
})();
