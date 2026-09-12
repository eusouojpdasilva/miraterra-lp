# MiraTerra Expedições

Landing page responsiva de captação para consultoria de safáris. HTML, CSS e JavaScript estáticos, sem dependências ou etapa de compilação.

## Publicar no Cloudflare Pages

1. No painel Cloudflare, abra **Workers & Pages → Create application → Pages → Import an existing Git repository**.
2. Conecte o GitHub e selecione **eusouojpdasilva/miraterra-lp**.
3. Configure:

| Campo | Valor |
| --- | --- |
| Nome do projeto | `miraterra-lp` |
| Branch de produção | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `dist` |
| Root directory | Deixar vazio (raiz do repositório) |
| Variáveis de ambiente | Nenhuma |

4. Clique em **Save and Deploy**. O Cloudflare informará o endereço publicado.

Escolha **Pages** na criação do projeto. Este repositório não precisa de comando `wrangler deploy` nem de Worker. O arquivo `wrangler.toml` define a pasta de saída para Pages. Depois de conectar o repositório, novos pushes em `main` acionam a publicação pelo Cloudflare.

Para usar domínio próprio, adicione-o na aba **Custom domains** do projeto publicado e siga as instruções de DNS exibidas pelo Cloudflare.

Referências oficiais: [HTML estático](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) e [integração com Git](https://developers.cloudflare.com/pages/get-started/git-integration/).

## Prévia local

Com Node.js instalado, execute:

```sh
node preview.cjs
```

Abra http://127.0.0.1:4173. Não é necessário executar npm install. O servidor de prévia é apenas local; o Cloudflare publica diretamente os arquivos de `dist`.

## Arquivos e ajustes

- `dist/index.html`: textos, seções, formulário e FAQ.
- `dist/styles.css`: identidade visual, abertura e faixas de imagens.
- `dist/sections.css`: demais seções e estilos responsivos.
- `dist/app.js`: formulário, validação, animações e integração com WhatsApp.
- `dist/assets/`: imagens utilizadas na página.
- `wrangler.toml`: configuração do Cloudflare Pages.
- `.openai/hosting.json`: registro da versão anterior no Sites; não é utilizado pelo Cloudflare nem faz parte da pasta publicada.

O WhatsApp de destino está configurado como **+55 61 98178-4728** em `dist/app.js`. Ao concluir as quatro etapas, o formulário abre uma mensagem com as respostas; o visitante revisa e confirma o envio no WhatsApp. Não há banco de dados nem armazenamento dos leads no servidor.

As imagens foram geradas para esta página. O retrato na seção Carlos é ilustrativo e está identificado na legenda. Para usar a foto real, substitua `dist/assets/guide.png` e ajuste o texto alternativo e a legenda em `dist/index.html`.

As fontes são carregadas pelo Google Fonts, com fontes locais de fallback.
