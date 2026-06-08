# Memória de Projetos — Felipe Vieira / FV Engineers

> Documento central de referência: onde está o código-fonte, os deploys e os
> links de cada aplicativo e site. Mantenha este arquivo atualizado a cada novo
> projeto ou mudança de domínio/deploy.
>
> **Última atualização:** 2026-06-08

---

## Visão geral

Todo o código-fonte e histórico (commits) dos aplicativos vive nos
**repositórios GitHub** da conta [`fneriemari-coder`](https://github.com/fneriemari-coder).
Não há memória persistente fora do git — cada commit é um ponto da história.

| Repositório | Visibilidade | Stack | App / Finalidade |
|---|---|---|---|
| [`mes-injetoras`](https://github.com/fneriemari-coder/mes-injetoras) | 🔒 Privado | Vue | App MES / Injetoras / FV Engineers |
| [`Felipe-Vieira`](https://github.com/fneriemari-coder/Felipe-Vieira) | 🌐 Público | JavaScript (React + Vite) | Gestão Financeira (fluxo de caixa) |

---

## Aplicativos

### 1. MES Injetoras / FV Engineers

- **Repositório:** `fneriemari-coder/mes-injetoras` (privado)
- **Stack:** Vue
- **Branch padrão:** `master`
- **Deploys / Links:**
  - https://app.fvengineers.com/login
  - https://app.fvengineers.com/landing
  - https://mes-injetoras-web.vercel.app
  - https://mes-injetoras-service-web.vercel.app/welcome
- **Infra:** Vercel (deploy) + domínio próprio `fvengineers.com` apontando para o deploy.
- **Observação:** este é o aplicativo principal (sistema MES / gestão de
  injetoras). O código-fonte completo e o histórico estão neste repositório.

### 2. Gestão Financeira

- **Repositório:** `fneriemari-coder/Felipe-Vieira` (público) — *este repositório*
- **Stack:** Frontend React + Vite · Backend Node + Express · Banco SQLite (arquivo local)
- **Finalidade:** Gerenciar o fluxo de caixa da empresa — registrar entradas e
  saídas, filtrar por período/categoria e acompanhar o saldo em tempo real.
- **Estrutura:**
  - `src/` — frontend React (componentes, API client, estilos)
  - `server/` — backend Express + SQLite (`db.js`, `index.js`)

---

## Domínios

| Domínio | Aponta para | Uso |
|---|---|---|
| `app.fvengineers.com` | Deploy Vercel do `mes-injetoras` | App de produção (login/landing) |
| `mes-injetoras-web.vercel.app` | Vercel | Deploy direto do `mes-injetoras` |
| `mes-injetoras-service-web.vercel.app` | Vercel | Deploy de serviço/welcome do `mes-injetoras` |

---

## Como retomar o trabalho em cada app

- **Para o app MES / FV Engineers:** abrir uma sessão do Claude Code apontando
  para o repositório `fneriemari-coder/mes-injetoras` (na web, selecionar esse
  repo ao criar o ambiente). A sessão atual só tem acesso ao `Felipe-Vieira`.
- **Para o app de Gestão Financeira:** continuar neste repositório
  (`fneriemari-coder/Felipe-Vieira`).
