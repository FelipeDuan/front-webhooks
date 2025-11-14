# Webhook Inspector - Frontend

Interface web moderna desenvolvida em React para visualizar e gerenciar webhooks capturados. Este projeto foi criado para fins de estudo e demonstração de conceitos modernos de desenvolvimento frontend.

## 📋 Sobre o Projeto

O **Webhook Inspector Frontend** é uma aplicação React que fornece uma interface intuitiva para visualizar, inspecionar e trabalhar com webhooks capturados pelo backend. A aplicação oferece uma experiência de usuário fluida com recursos como scroll infinito, visualização detalhada de requisições e geração de handlers TypeScript.

## 🚀 Funcionalidades

### Visualização de Webhooks
- **Lista de Webhooks**: Visualização paginada com scroll infinito
- **Detalhes Completos**: Visualização detalhada de cada webhook capturado
- **Informações do Request**: Método HTTP, status code, content-type, content-length
- **Headers**: Visualização completa de todos os headers HTTP
- **Query Parameters**: Exibição de parâmetros de query string
- **Body**: Visualização formatada do corpo da requisição com syntax highlighting

### Gerenciamento
- **Seleção Múltipla**: Seleção de múltiplos webhooks para processamento em lote
- **Geração de Handlers**: Geração automática de código TypeScript com validação Zod
- **Visualização de Código**: Dialog modal para visualizar e copiar código gerado
- **Navegação**: Interface dividida em painéis (lista e detalhes)

### Experiência do Usuário
- **Layout Responsivo**: Interface adaptável a diferentes tamanhos de tela
- **Loading States**: Estados de carregamento com skeletons
- **Scroll Infinito**: Carregamento automático de mais webhooks ao rolar
- **Syntax Highlighting**: Destaque de sintaxe para código JSON/TypeScript
- **Dark Mode**: Interface com tema escuro moderno

## 🛠️ Tecnologias

### Core
- **React 19**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool rápida e moderna

### Roteamento e Estado
- **TanStack Router**: Roteamento type-safe e moderno
- **TanStack Query**: Gerenciamento de estado do servidor e cache
- **React Suspense**: Gerenciamento de loading states

### UI e Estilização
- **Tailwind CSS 4**: Framework CSS utility-first
- **Radix UI**: Componentes acessíveis e não-estilizados
  - Dialog
  - Checkbox
- **Lucide React**: Biblioteca de ícones
- **Shiki**: Syntax highlighting de alta qualidade

### Utilitários
- **Zod**: Validação de schemas e tipos
- **date-fns**: Manipulação de datas
- **react-resizable-panels**: Painéis redimensionáveis
- **tailwind-merge**: Merge inteligente de classes Tailwind
- **tailwind-variants**: Variantes de componentes com Tailwind

### Ferramentas
- **Biome**: Linter e formatter rápido
- **TypeScript**: Compilador e type checker

## 📦 Estrutura do Projeto

```
front-webhooks/
├── src/
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes de UI reutilizáveis
│   │   │   ├── badge.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── code-block.tsx
│   │   │   ├── icon-button.tsx
│   │   │   └── skeleton.tsx
│   │   ├── dialog-handlers-code.tsx
│   │   ├── section-data-table.tsx
│   │   ├── section-title.tsx
│   │   ├── sidebar.tsx
│   │   ├── sidebar-suspense-data.tsx
│   │   ├── webhook-detail-header.tsx
│   │   ├── webhook-details.tsx
│   │   ├── webhook-not-selected.tsx
│   │   ├── webhooks-list-item.tsx
│   │   └── webhooks-list.tsx
│   ├── http/                # Configurações HTTP
│   │   ├── hooks/           # Custom hooks
│   │   └── schemas/         # Schemas Zod para validação
│   │       └── webhooks.ts
│   ├── routes/              # Rotas da aplicação
│   │   ├── __root.tsx       # Layout raiz
│   │   ├── index.tsx        # Página inicial
│   │   └── webhooks.$id.tsx # Página de detalhes
│   ├── index.css            # Estilos globais
│   ├── main.tsx             # Ponto de entrada
│   └── routeTree.gen.ts     # Árvore de rotas gerada
├── public/                  # Arquivos estáticos
└── package.json
```

## 🔧 Instalação

### Pré-requisitos
- Node.js 18+ (recomendado usar pnpm como gerenciador de pacotes)
- Backend do Webhook Inspector rodando (porta 3100)

### Passos

1. **Navegue até o diretório**:
```bash
cd front-webhooks
```

2. **Instale as dependências**:
```bash
pnpm install
```

3. **Inicie o servidor de desenvolvimento**:
```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta se 5173 estiver ocupada).

## 📚 Uso da Aplicação

### Visualizar Webhooks

1. A lista de webhooks é carregada automaticamente na página inicial
2. Use o scroll para carregar mais webhooks (scroll infinito)
3. Clique em um webhook para ver seus detalhes no painel direito

### Inspecionar Detalhes

Ao clicar em um webhook, você verá:
- **Request Overview**: Método, status code, content-type, content-length
- **Headers**: Todos os headers HTTP da requisição
- **Query Parameters**: Parâmetros de query string (se houver)
- **Request Body**: Corpo da requisição formatado com syntax highlighting

### Gerar Handler TypeScript

1. Selecione um ou mais webhooks usando os checkboxes
2. Clique no botão "Gerar handler" no topo da lista
3. O código TypeScript será gerado usando IA e exibido em um dialog
4. Copie o código gerado para usar em seus projetos

## 🎨 Componentes Principais

### WebhooksList
Componente principal que exibe a lista de webhooks com:
- Scroll infinito
- Seleção múltipla
- Botão de geração de handlers

### WebhookDetails
Componente que exibe os detalhes completos de um webhook:
- Informações gerais
- Headers em formato de tabela
- Query parameters
- Body com syntax highlighting

### DialogHandlersCode
Dialog modal que exibe o código TypeScript gerado com:
- Syntax highlighting
- Botão de copiar
- Visualização formatada

## 🧪 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento com hot-reload
- `pnpm build`: Compila a aplicação para produção
- `pnpm preview`: Visualiza a build de produção localmente
- `pnpm format`: Formata o código usando Biome

## 🔌 Integração com Backend

A aplicação se conecta ao backend através das seguintes APIs:

- `GET http://localhost:3100/api/webhooks` - Lista webhooks
- `GET http://localhost:3100/api/webhooks/{id}` - Busca webhook por ID
- `POST http://localhost:3100/api/generate` - Gera handler TypeScript
- `DELETE http://localhost:3100/api/webhooks/{id}` - Deleta webhook

**Nota**: Certifique-se de que o backend está rodando na porta 3100 ou ajuste as URLs nos componentes.

## 🎯 Features de UX

### Scroll Infinito
- Carregamento automático ao chegar ao final da lista
- Indicador visual de carregamento
- Otimizado com Intersection Observer API

### Estados de Loading
- Skeleton loaders durante carregamento inicial
- Spinners durante fetch de mais dados
- Estados vazios informativos

### Responsividade
- Layout adaptável para desktop e mobile
- Painéis redimensionáveis
- Navegação otimizada para diferentes tamanhos de tela

## 📝 Notas de Desenvolvimento

- Este projeto foi criado para fins de estudo e aprendizado
- A aplicação usa React Suspense para gerenciamento de loading states
- TanStack Query é usado para cache e sincronização de dados
- O código gerado usa Shiki para syntax highlighting de alta qualidade
- A interface foi projetada com foco em dark mode

## 🚀 Build para Produção

Para criar uma build de produção:

```bash
pnpm build
```

Os arquivos otimizados estarão em `dist/`. Para visualizar:

```bash
pnpm preview
```

## 🤝 Contribuindo

Este é um projeto de estudo. Sinta-se livre para explorar, modificar e aprender com o código!

## 📄 Licença

ISC
