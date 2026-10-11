# Soares Embalagens — site institucional

Site estático da Soares Embalagens: big bags, bulk liners, bulk sheets e slings. Matriz em Santos/SP e filial em Machado/MG.

## Estrutura

```
index.html          marcação das páginas e logotipos (SVG)
css/style.css       estilos, tokens de cor e temas claro/escuro
js/theme-init.js    aplica o tema salvo antes da primeira pintura
js/main.js          navegação, catálogo, formulários e big bag 3D
img/                fotos e favicon
CNAME               domínio soaresemb.com.br
```

## Páginas

Navegação por âncoras dentro do `index.html`: Início, Empresa, Produtos, Fale conosco, Vagas e Solicitar cotação.

## Formulários

Os envios usam o [FormSubmit](https://formsubmit.co):

| Formulário   | Destino                         |
|--------------|---------------------------------|
| Cotação      | comercial@soaresemb.com.br      |
| Fale conosco | contato@soaresemb.com.br        |
| Vagas        | recrutamento@soaresemb.com.br (com currículo anexo) |

No primeiro envio de cada formulário, o FormSubmit manda um e-mail de ativação para o endereço de destino. É preciso clicar em **Activate Form** uma vez em cada caixa de e-mail.

## Publicação

Hospedado no GitHub Pages a partir da branch `main`, pasta raiz, no domínio [soaresemb.com.br](https://soaresemb.com.br). Não há etapa de build.

## Dependências externas

- Fontes: Plus Jakarta Sans e IBM Plex Mono (Google Fonts)
- Three.js r128 (cdnjs) para o big bag em 3D da página inicial

Desenvolvido por [Pedro Lima](https://pedrolimv.github.io/portfolio).
