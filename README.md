# Lena Neuropsicologa

Projeto em React + Vite, pronto para Netlify, sem Firebase.

## O que foi feito

- removidas as referências usadas no Base44 do app
- título da página ajustado para **Lena Neuropsicologa**
- footer ajustado para:
  `2026 Lena Neuropsicologa. Feito por Nexor Digital Group todos os direitos reservados.`
- rota `/admin` criada para editar o conteúdo do site
- login simples do admin com senha via `ADMIN_PASSWORD`
- salvamento online com **Netlify Functions + Netlify Blobs**
- upload de imagens no admin com URL pronta para colar no JSON
- preparado para deploy na **Netlify** (`netlify.toml` e `public/_redirects`)

## Como rodar

### Opção simples

```bash
npm install
npm run dev
```

Essa opção sobe só o front-end. Se as Functions da Netlify não estiverem rodando, o site usa o conteúdo local do navegador.

### Opção completa com admin online

```bash
npm install
npx netlify dev
```

Ou:

```bash
npm install
npm run dev:netlify
```

## Como configurar a senha do admin

Crie um arquivo `.env` na raiz com:

```env
ADMIN_PASSWORD=sua-senha-forte-aqui
ADMIN_SECRET=uma-chave-extra-opcional
```

- `ADMIN_PASSWORD` é obrigatória
- `ADMIN_SECRET` é opcional e serve para assinar a sessão do admin

## Como publicar na Netlify

1. Envie o projeto para um repositório Git.
2. Conecte o repositório na Netlify.
3. Em **Site configuration > Environment variables**, adicione:
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET` (opcional)
4. Build command: `npm run build`
5. Publish directory: `dist`

## Como usar o admin

1. Acesse `/admin`
2. Entre com a senha definida em `ADMIN_PASSWORD`
3. Edite o JSON do site
4. Clique em **Salvar online**
5. Para trocar imagens, envie pelo bloco de upload e cole a URL gerada no JSON

## Observações

- O conteúdo e as imagens ficam persistidos na Netlify, então não somem no próximo deploy.
- Em desenvolvimento local, o ideal é usar `netlify dev` para testar as Functions.
