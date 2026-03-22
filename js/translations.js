const translations = {
    pt: {
        // Nav
        nav_features: 'Funcionalidades',
        nav_sources: 'Fontes',
        nav_docs: 'Docs',
        nav_cta: 'Acessar',

        // Hero
        hero_label: 'Validação geoespacial ambiental',
        hero_title: 'Cruze parcelas rurais contra bases ambientais oficiais',
        hero_desc: 'Motor de validação que verifica sobreposição com áreas protegidas, desmatamento, embargos e terras indígenas. Resultado em menos de 2 minutos.',
        hero_cta: 'Começar agora',
        hero_docs: 'Documentação',

        // Stats
        stat_layers: 'Camadas oficiais',
        stat_time: 'Tempo de validação',
        stat_report: 'Relatório auditável',
        stat_api: 'REST integrável',

        // Features
        features_label: 'Funcionalidades',
        features_title: 'Infraestrutura de conformidade',
        features_desc: 'Validação determinística contra bases oficiais. Mesma área, mesma data, mesmo resultado.',

        feat1_title: 'Resultado reproduzível',
        feat1_desc: 'Validações determinísticas sem margem para interpretação. Auditável por terceiros.',
        feat2_title: 'Validação geométrica',
        feat2_desc: 'Polígonos inválidos detectados e corrigidos automaticamente via PostGIS antes do cruzamento.',
        feat3_title: 'Relatório PDF',
        feat3_desc: 'Documento auditável com QR Code para verificação pública. Pronto para due diligence.',
        feat4_title: 'Fontes rastreáveis',
        feat4_desc: 'Todas as camadas provêm de órgãos oficiais: INPE, FUNAI, IBAMA, ICMBio, INCRA.',
        feat5_title: 'API REST',
        feat5_desc: 'Integre validação ambiental ao seu sistema. JSON in, JSON + PDF out.',
        feat6_title: 'Criptografia e auditoria',
        feat6_desc: 'Dados sensíveis criptografados em repouso. Trilha de auditoria com hashes criptográficos.',

        // Sources
        sources_label: 'Fontes de dados',
        sources_title: 'Camadas oficiais integradas',
        sources_desc: 'Integração direta com bases governamentais brasileiras.',

        src1_name: 'PRODES',
        src1_desc: 'Desmatamento na Amazônia Legal',
        src2_name: 'Terras Indígenas',
        src2_desc: 'Demarcações homologadas e em processo',
        src3_name: 'Unidades de Conservação',
        src3_desc: 'Proteção integral e uso sustentável',
        src4_name: 'Embargos Ambientais',
        src4_desc: 'Áreas com restrição ambiental ativa',
        src5_name: 'Territórios Quilombolas',
        src5_desc: 'Comunidades tradicionais tituladas',
        src6_org: 'Governo Federal',
        src6_name: 'Amazônia Legal',
        src6_desc: 'Área sujeita a legislação ambiental especial',

        // Evidence badge
        evidence_badge: 'Integrado',

        // Methodology
        method_label: 'Como funciona',
        method_title: 'Fluxo de validação',
        method_desc: 'Envie uma geometria, receba o diagnóstico ambiental completo. Três passos, zero ambiguidade.',
        method_process: 'Processamento',
        method_process_desc: 'PostGIS + 6 camadas',
        method_output_desc: 'JSON + PDF auditável',
        method_step1_label: 'Passo 01',
        method_step1_title: 'Envie a geometria',
        method_step1_detail: 'Desenhe no mapa, faça upload de GeoJSON ou envie via API REST.',
        method_step2_label: 'Passo 02',
        method_step2_title: 'Cruzamento automático',
        method_step2_detail: 'PostGIS cruza contra 6 bases oficiais simultaneamente.',
        method_step3_label: 'Passo 03',
        method_step3_title: 'Resultado + Relatório',
        method_step3_detail: 'JSON com status de cada camada + PDF auditável com QR Code.',

        // CTA
        cta_title: 'Valide sua área agora',
        cta_desc: 'Resultado em menos de 2 minutos. Sem cartão de crédito para começar.',
        cta_primary: 'Começar agora',
        cta_contact: 'Contato',
        cta_preview_title: 'Validação Completa',
        cta_preview_status: 'Conforme',
        cta_preview_pdf: 'Baixar PDF',

        // Footer
        footer_privacy: 'Privacidade',
        footer_terms: 'Termos',
        footer_tagline: 'Validação geoespacial ambiental',
        trust_encryption: 'Criptografia AES-256',
        trust_hosting: 'Dados hospedados no Brasil',
        trust_audit: 'Trilha de auditoria completa',
        footer_copy: '\u00a9 2026 GreenGate. Todos os direitos reservados.'
    },
    en: {
        // Nav
        nav_features: 'Features',
        nav_sources: 'Sources',
        nav_docs: 'Docs',
        nav_cta: 'Access',

        // Hero
        hero_label: 'Geospatial environmental validation',
        hero_title: 'Cross-check rural parcels against official environmental databases',
        hero_desc: 'Validation engine that checks overlap with protected areas, deforestation, embargoes and indigenous lands. Results in under 2 minutes.',
        hero_cta: 'Get started',
        hero_docs: 'Documentation',

        // Stats
        stat_layers: 'Official layers',
        stat_time: 'Validation time',
        stat_report: 'Auditable report',
        stat_api: 'Integrable REST',

        // Features
        features_label: 'Features',
        features_title: 'Compliance infrastructure',
        features_desc: 'Deterministic validation against official databases. Same area, same date, same result.',

        feat1_title: 'Reproducible results',
        feat1_desc: 'Deterministic validations with no room for interpretation. Auditable by third parties.',
        feat2_title: 'Geometric validation',
        feat2_desc: 'Invalid polygons detected and automatically corrected via PostGIS before cross-checking.',
        feat3_title: 'PDF report',
        feat3_desc: 'Auditable document with QR Code for public verification. Ready for due diligence.',
        feat4_title: 'Traceable sources',
        feat4_desc: 'All layers come from official agencies: INPE, FUNAI, IBAMA, ICMBio, INCRA.',
        feat5_title: 'REST API',
        feat5_desc: 'Integrate environmental validation into your system. JSON in, JSON + PDF out.',
        feat6_title: 'Encryption and audit',
        feat6_desc: 'Sensitive data encrypted at rest. Audit trail with cryptographic hashes.',

        // Sources
        sources_label: 'Data sources',
        sources_title: 'Integrated official layers',
        sources_desc: 'Direct integration with Brazilian government databases.',

        src1_name: 'PRODES',
        src1_desc: 'Deforestation in the Legal Amazon',
        src2_name: 'Indigenous Lands',
        src2_desc: 'Homologated and in-process demarcations',
        src3_name: 'Conservation Units',
        src3_desc: 'Full protection and sustainable use',
        src4_name: 'Environmental Embargoes',
        src4_desc: 'Areas with active environmental restrictions',
        src5_name: 'Quilombola Territories',
        src5_desc: 'Titled traditional communities',
        src6_org: 'Federal Government',
        src6_name: 'Legal Amazon',
        src6_desc: 'Area subject to special environmental legislation',

        // Evidence badge
        evidence_badge: 'Integrated',

        // Methodology
        method_label: 'How it works',
        method_title: 'Validation flow',
        method_desc: 'Submit a geometry, receive the full environmental diagnosis. Three steps, zero ambiguity.',
        method_process: 'Processing',
        method_process_desc: 'PostGIS + 6 layers',
        method_output_desc: 'JSON + auditable PDF',
        method_step1_label: 'Step 01',
        method_step1_title: 'Submit geometry',
        method_step1_detail: 'Draw on the map, upload GeoJSON, or send via REST API.',
        method_step2_label: 'Step 02',
        method_step2_title: 'Automated cross-check',
        method_step2_detail: 'PostGIS cross-checks against 6 official databases simultaneously.',
        method_step3_label: 'Step 03',
        method_step3_title: 'Result + Report',
        method_step3_detail: 'JSON with each layer status + auditable PDF with QR Code.',

        // CTA
        cta_title: 'Validate your area now',
        cta_desc: 'Results in under 2 minutes. No credit card required to start.',
        cta_primary: 'Get started',
        cta_contact: 'Contact',
        cta_preview_title: 'Validation Complete',
        cta_preview_status: 'Clear',
        cta_preview_pdf: 'Download PDF',

        // Footer
        footer_privacy: 'Privacy',
        footer_terms: 'Terms',
        footer_tagline: 'Geospatial environmental validation',
        trust_encryption: 'AES-256 Encryption',
        trust_hosting: 'Data hosted in Brazil',
        trust_audit: 'Full audit trail',
        footer_copy: '\u00a9 2026 GreenGate. All rights reserved.'
    }
};
