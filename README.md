# Lili Cartomante - Monorepo

Este é um monorepo contendo o frontend e backend do projeto Lili Cartomante.

## Estrutura do Projeto

```
lili-cartomante/
├── frontend/          # Angular 21 - Frontend do site
│   ├── angular.json
│   ├── netlify.toml   # Configuração do Netlify
│   ├── package.json
│   ├── src/
│   ├── dist/
│   └── README.md
│
├── backend/           # Strapi - Backend para gerenciar artigos
│   ├── package.json
│   ├── config/
│   ├── src/
│   ├── .env
│   └── README.md
│
└── README.md (este arquivo)
```

## Como começar

### Pré-requisitos
- Node.js 18+
- npm 10+

### Frontend

```bash
cd frontend
npm install
npm start          # Executa em http://localhost:4200
npm run build      # Build para produção
```

**Deploy**: Netlify (automático a cada push em `main`)

### Backend

```bash
cd backend
npm install
npm run dev        # Executa em http://localhost:1337
npm run build      # Build para produção
npm run deploy     # Deploy no Strapi Cloud
```

**Deploy**: Strapi Cloud

## CI/CD

Ambos os projetos podem ser deployados independentemente:
- **Frontend**: Deploy automático no Netlify ao fazer push
- **Backend**: Deploy manual no Strapi Cloud

Para mais detalhes, veja os README.md em cada pasta.

## Licença

[Adicione sua licença aqui]
