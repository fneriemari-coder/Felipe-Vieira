# Gestão Financeira

Aplicativo web para gerenciar o **fluxo de caixa** da empresa: registre entradas
e saídas, filtre por período/categoria e acompanhe o saldo em tempo real.

- **Frontend:** React + Vite
- **Backend:** Node + Express
- **Banco de dados:** SQLite (arquivo local, sem configuração)

## Pré-requisitos

- Node.js 18+ (testado com Node 22)

## Instalação

```bash
npm install
```

## Rodando em desenvolvimento

Inicia o backend (porta 3001) e o frontend (porta 5173) juntos:

```bash
npm run dev
```

Acesse **http://localhost:5173**. As chamadas `/api` são redirecionadas
automaticamente para o backend.

## Rodando em produção (servidor único)

Gera o frontend e o serve junto com a API em uma só porta:

```bash
npm run build
npm start
```

Acesse **http://localhost:3001**.

## Funcionalidades

- Registrar **entradas** e **saídas** (valor, data, descrição e categoria)
- Resumo automático: total de entradas, total de saídas e **saldo**
- Filtrar lançamentos por tipo, categoria e intervalo de datas
- Editar e excluir lançamentos
- Valores monetários em Real (R$), armazenados em centavos para evitar
  erros de arredondamento

## Estrutura

```
server/        API Express + SQLite
  db.js        conexão e schema do banco
  index.js     rotas da API e serviço do frontend
src/           aplicação React
  App.jsx      tela principal
  api.js       cliente HTTP da API
  format.js    formatação de moeda e datas
  components/   formulário, resumo, filtros e lista
```

## Banco de dados

Os dados ficam em `server/data.db` (criado automaticamente na primeira
execução). O arquivo é ignorado pelo Git. Para reiniciar do zero, basta
apagá-lo.

## API

| Método | Rota                  | Descrição                                  |
| ------ | --------------------- | ------------------------------------------ |
| GET    | `/api/transactions`   | Lista lançamentos (filtros: `type`, `category`, `from`, `to`) |
| POST   | `/api/transactions`   | Cria um lançamento                          |
| PUT    | `/api/transactions/:id` | Atualiza um lançamento                    |
| DELETE | `/api/transactions/:id` | Remove um lançamento                      |
| GET    | `/api/summary`        | Totais e saldo do período                   |
| GET    | `/api/categories`     | Categorias em uso                           |

Valores (`amount`) são enviados e armazenados em **centavos** (inteiros).
