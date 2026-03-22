/**
 * GG Namespace — constantes, metadata estatica e estado compartilhado.
 * Carregado PRIMEIRO, antes de todos os outros modulos.
 */
window.GG = {
    // Constantes
    API_URL: 'https://api.greengate.com.br',
    MAX_HISTORY: 5,
    MAX_AREA_HA: 10000,
    VALIDATION_COOLDOWN_MS: 2000,
    SEARCH_DEBOUNCE_MS: 350,
    TOAST_DURATION_MS: 4000,
    TOAST_DURATION_ERROR_MS: 5000,
    CONSENT_BANNER_DELAY_MS: 2000,
    ZOOM_COUNTRY: 6,
    ZOOM_REGION: 8,
    ZOOM_LOCALITY: 12,
    ZOOM_LOCATE: 14,
    GEOCODING_CACHE_MAX: 50,

    // Metadata estatica
    CHECK_METADATA: {
        'deforestation_prodes': { source: 'PRODES/INPE', id_field: null },
        'deforestation_deter': { source: 'DETER/INPE', id_field: null },
        'deforestation_mapbiomas': { source: 'MapBiomas Alerta', id_field: 'alert_code' },
        'terra_indigena': { source: 'FUNAI', id_field: 'codigo' },
        'embargo_ibama': { source: 'IBAMA', id_field: 'numero_tad' },
        'quilombola': { source: 'INCRA', id_field: 'codigo' },
        'uc': { source: 'ICMBio/MMA', id_field: 'codigo' },
        'queimadas': { source: 'INPE/Queimadas', id_field: null },
        'app_hidrografia': { source: 'ANA', id_field: null },
        'floresta_publica': { source: 'SFB/CNFP', id_field: null },
        'concessao_florestal': { source: 'SFB', id_field: null },
        'sicar_status': { source: 'SICAR/CAR', id_field: 'cod_imovel' },
        'pivos_irrigacao': { source: 'ANA', id_field: null },
        // Legado (compatibilidade)
        'app_water': { source: 'ANA', id_field: null },
        'deforestation': { source: 'PRODES/INPE', id_field: null },
        'prodes': { source: 'PRODES/INPE', id_field: null },
        'mapbiomas': { source: 'MapBiomas', id_field: 'alert_code' },
        'mapbiomas_alert': { source: 'MapBiomas', id_field: 'alert_code' },
        'indigenous_territory': { source: 'FUNAI', id_field: 'codigo' },
        'conservation_unit': { source: 'ICMBio/MMA', id_field: 'codigo' },
        'embargo': { source: 'IBAMA', id_field: 'numero_tad' },
        'settlement': { source: 'INCRA', id_field: 'codigo' }
    },

    VALID_STATUSES: ['pass', 'fail', 'warning', 'skip'],

    EXAMPLE_COORDS: [
        [-55.3594394984761, -11.86920257487204],
        [-55.35394633441345, -11.871806426068545],
        [-55.36038363604937, -11.884783313415083],
        [-55.36201441913047, -11.88398539967109],
        [-55.363430625490366, -11.883565444129728],
        [-55.36549056201385, -11.883271474865357],
        [-55.3594394984761, -11.86920257487204]
    ],

    // Estado mutavel (populado por outros modulos)
    map: null,
    view: null,
    graphicsLayer: null,
    sketchVM: null,
    overlapsLayer: null,
    currentPolygon: null,
    currentGraphic: null,
    geoEngine: null,
    webMercatorUtils: null,
    currentValidationResult: null,
    currentMeta: { municipality: null, state: null, address: null },
    lastValidationTime: 0,
    searchTimeout: null,
    cookieConsentGiven: false,

    // ESRI constructors (set by gg-map.js)
    _Graphic: null,
    _Polygon: null,
    _locator: null
};

// Alias: window.currentValidationResult <-> GG.currentValidationResult
// Needed by app-translations.js which reads window.currentValidationResult
Object.defineProperty(window, 'currentValidationResult', {
    get: function() { return window.GG.currentValidationResult; },
    set: function(v) { window.GG.currentValidationResult = v; },
    configurable: true
});
