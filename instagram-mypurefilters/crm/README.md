# 📊 CRM & Placar (planilhas)

Abra os `.csv` no **Excel** ou **Google Sheets** (Arquivo → Importar). São modelos prontos —
as linhas de exemplo podem ser apagadas.

| Arquivo | Uso |
|---|---|
| `leads-crm-template.csv` | Cadastro de cada lead: contato, idioma, cidade, **tipo de imóvel** (apartamento → só RO), produto, origem, **status** do funil, próximos passos e valor da venda |
| `placar-diario.csv` | **Placar diário**: verba, leads (pago + prospecção), CPL, agendamentos, visitas, vendas do dia e acumuladas rumo às **40** |

## Como usar (rotina)
1. **Todo lead novo** entra no `leads-crm-template.csv` em < 5 min (origem + idioma + tipo de imóvel).
2. **Mova o status** conforme avança: Novo → Qualificado → Agendado → Apresentado → Proposta → Fechado/Perdido.
3. **Follow-up** de quem não respondeu: 3 toques (dia 1, 3, 7) — ver `../08-funil-leads-direct-whatsapp.md`.
4. **No fim do dia**, preencha 1 linha no `placar-diario.csv` e defina a **ação de amanhã**.
5. **Toda semana**, some leads/CPL/vendas e decida o que escalar/pausar (ver `../13-...`).

> Dica: no Google Sheets, crie um filtro por **Status** e por **Tipo de imóvel** para priorizar
> os leads quentes e separar os de apartamento (oferta de Osmose Reversa).
