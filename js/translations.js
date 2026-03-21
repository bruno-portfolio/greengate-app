const translations = {
    pt: {
        // Nav
        nav_features: 'Funcionalidades',
        nav_sources: 'Fontes',
        nav_docs: 'Docs',
        nav_cta: 'Acessar',

        // Hero
        hero_label: 'Validacao geoespacial ambiental',
        hero_title: 'Cruze parcelas rurais contra bases ambientais oficiais',
        hero_desc: 'Motor de validacao que verifica sobreposicao com areas protegidas, desmatamento, embargos e terras indigenas. Resultado em menos de 2 minutos.',
        hero_cta: 'Comecar agora',
        hero_docs: 'Documentacao',

        // Stats
        stat_layers: 'Camadas oficiais',
        stat_time: 'Tempo de validacao',
        stat_report: 'Relatorio auditavel',
        stat_api: 'REST integravel',

        // Features
        features_label: 'Funcionalidades',
        features_title: 'Infraestrutura de conformidade',
        features_desc: 'Validacao deterministica contra bases oficiais. Mesma area, mesma data, mesmo resultado.',

        feat1_title: 'Resultado reproduzivel',
        feat1_desc: 'Validacoes deterministicas sem margem para interpretacao. Auditavel por terceiros.',
        feat2_title: 'Validacao geometrica',
        feat2_desc: 'Poligonos invalidos detectados e corrigidos automaticamente via PostGIS antes do cruzamento.',
        feat3_title: 'Relatorio PDF',
        feat3_desc: 'Documento auditavel com QR Code para verificacao publica. Pronto para due diligence.',
        feat4_title: 'Fontes rastreavies',
        feat4_desc: 'Todas as camadas provem de orgaos oficiais: INPE, FUNAI, IBAMA, ICMBio, INCRA.',
        feat5_title: 'API REST',
        feat5_desc: 'Integre validacao ambiental ao seu sistema. JSON in, JSON + PDF out.',
        feat6_title: 'Criptografia e auditoria',
        feat6_desc: 'Dados sensiveis criptografados em repouso. Trilha de auditoria com hashes criptograficos.',

        // Sources
        sources_label: 'Fontes de dados',
        sources_title: 'Camadas oficiais integradas',
        sources_desc: 'Integracao direta com bases governamentais brasileiras.',

        src1_name: 'PRODES',
        src1_desc: 'Desmatamento na Amazonia Legal',
        src2_name: 'Terras Indigenas',
        src2_desc: 'Demarcacoes homologadas e em processo',
        src3_name: 'Unidades de Conservacao',
        src3_desc: 'Protecao integral e uso sustentavel',
        src4_name: 'Embargos Ambientais',
        src4_desc: 'Areas com restricao ambiental ativa',
        src5_name: 'Territorios Quilombolas',
        src5_desc: 'Comunidades tradicionais tituladas',
        src6_org: 'Governo Federal',
        src6_name: 'Amazonia Legal',
        src6_desc: 'Area sujeita a legislacao ambiental especial',

        // Methodology
        method_label: 'Como funciona',
        method_title: 'Fluxo de validacao',
        method_process: 'Processamento',
        method_process_desc: 'PostGIS + 6 camadas',
        method_output_desc: 'JSON + PDF auditavel',

        // CTA
        cta_title: 'Valide sua area agora',
        cta_desc: 'Resultado em menos de 2 minutos. Sem cartao de credito para comecar.',
        cta_primary: 'Comecar agora',
        cta_contact: 'Contato',

        // Footer
        footer_privacy: 'Privacidade',
        footer_terms: 'Termos',
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

        // Methodology
        method_label: 'How it works',
        method_title: 'Validation flow',
        method_process: 'Processing',
        method_process_desc: 'PostGIS + 6 layers',
        method_output_desc: 'JSON + auditable PDF',

        // CTA
        cta_title: 'Validate your area now',
        cta_desc: 'Results in under 2 minutes. No credit card required to start.',
        cta_primary: 'Get started',
        cta_contact: 'Contact',

        // Footer
        footer_privacy: 'Privacy',
        footer_terms: 'Terms',
        footer_copy: '\u00a9 2026 GreenGate. All rights reserved.'
    }
};
