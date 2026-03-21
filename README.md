# GreenGate

> API de geoconformidade para validacao ambiental de imoveis rurais

[![Website](https://img.shields.io/badge/website-greengate.com.br-green)](https://www.greengate.com.br)
[![Status](https://img.shields.io/badge/status-production-brightgreen)](https://www.greengate.com.br)
[![License](https://img.shields.io/badge/license-proprietary-red)](https://www.greengate.com.br/pages/terms.html)

Motor de validacao geoespacial que verifica sobreposicao de parcelas de terra com areas protegidas, alertas de desmatamento, terras indigenas e outras camadas regulatorias brasileiras.

## Casos de Uso

- Conformidade na cadeia de suprimentos agricola
- Due diligence ESG para investimentos fundiarios
- Automacao de relatorios regulatorios
- Integracao de monitoramento de desmatamento

## Como Funciona

```
Seu App  ────>  GreenGate API  ────>  Resultado
(GeoJSON)                             (JSON/PDF)
```

1. Envie um poligono (fazenda, talhao, concessao)
2. Receba status de conformidade + pontuacao de risco + relatorio detalhado

## Funcionalidades

| Funcionalidade | Descricao |
|----------------|-----------|
| Autenticacao | Chave de API com rate limiting |
| Auditoria | Trilha completa com hashes criptograficos |
| Relatorios | Geracao de PDF para due diligence |
| Escalabilidade | Cloud-native, PostgreSQL + PostGIS |

## Camadas de Referencia

- Alertas de desmatamento (PRODES/DETER)
- Terras indigenas
- Unidades de conservacao
- Embargos ambientais (IBAMA)
- Camadas personalizadas disponiveis sob demanda

## Estrutura do Projeto

```
greengate-app/
├── index.html              Landing page
├── pages/                  Paginas HTML (app, docs, faq, termos, privacidade)
├── js/                     Scripts de traducao (PT/EN)
├── assets/                 PDFs e arquivos estaticos
└── docker/                 Configuracao de deploy (Docker, Railway)
```

## Stack

- HTML5, CSS3, JavaScript ES6+
- ArcGIS JS 4.28 (mapas geoespaciais)
- Sistema de i18n customizado (PT/EN)
- Docker + Railway (deploy)

## Links

- [Documentacao](https://www.greengate.com.br/pages/docs.html)
- [FAQ](https://www.greengate.com.br/pages/faq.html)
- [Termos de Uso](https://www.greengate.com.br/pages/terms.html)
- [Politica de Privacidade](https://www.greengate.com.br/pages/privacy.html)

## Licenca

Proprietaria. Entre em contato para informacoes sobre licenciamento.
