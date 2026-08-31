# Workshops

Portal de workshops práticos, construído com React e Vite. Cada workshop é uma rota da aplicação e pode ser acessado diretamente pelo GitHub Pages.

## Rotas

- `/workshops/` — página inicial
- `/workshops/docker/` — workshop Docker

## Desenvolvimento local

Pré-requisitos: Node.js 22 ou superior e npm.

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite. Como o projeto usa a base `/workshops/`, acesse o endereço terminado em `/workshops/`.

## Build de produção

```bash
npm run build
npm run preview
```

O resultado é gerado em `dist/`.

## Adicionar um workshop

1. Crie a rota do workshop em `src/`.
2. Adicione a rota em `src/App.jsx`.
3. Inclua um cartão de acesso na página inicial.
4. Coloque imagens e outros arquivos estáticos em `public/<workshop>/`.

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy.yml` publica automaticamente a aplicação a cada push para `main`. No repositório GitHub, habilite **Settings → Pages → Build and deployment → GitHub Actions**.

O valor `base` em `vite.config.js` está configurado para o repositório `workshops`. Se o repositório mudar de nome, atualize esse valor para `/<novo-repositorio>/`.
