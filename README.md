# Young Family — site

Site da **Young Family (YF)**, grupo de trap de Luanda: Lil Boy, Lil Mac, Okénio M, Deivly, Fábio Freitas, Lil Fox, Nello Boy e Lil Drizzy.

Direcção criativa: *noir* cinematográfico inspirado na era **Don & Don** — letterbox, timecode, fotogramas dos vídeos oficiais, vermelho-sangue do logótipo D&N e créditos de filme.

## Stack

- React 19 + TypeScript + Vite
- Bun (gestor de pacotes e scripts)
- GSAP + ScrollTrigger, Lenis (scroll suave)
- Fontes self-hosted via Fontsource: Big Shoulders Display, Instrument Serif, Geist

## Desenvolvimento

```bash
bun install
bun run dev
bun run build   # gera ./dist
```

## Deploy (Render)

Static Site configurado em `render.yaml`:

- Build: `npm install -g bun && bun install --frozen-lockfile && bun run build`
- Publish directory: `dist`

## Loja (`/loja`)

Módulo de loja virtual, começando pelos chapéus.

- Rotas: `/loja`, `/loja/<produto>`, `/loja/checkout` (router próprio em `src/router.tsx`).
- **Catálogo**: tudo em `src/shop/catalog.ts` — produtos, preços (Kz), cores, tamanhos, estado (`disponivel`, `pre-encomenda`, `esgotado`), número de WhatsApp, taxas de entrega e métodos de pagamento.
- **Imagens**: enquanto não há fotografias, cada produto mostra um desenho técnico gerado em SVG (`src/shop/HatArt.tsx`) com a cor e o bordado. Para usar fotos, coloca-as em `public/media/loja/` e preenche `photos` na cor respectiva.
- **Aviso de pré-lançamento**: `SHOP.preview = false` esconde-o quando os preços e fotos forem finais.
- **Carrinho**: guardado no `localStorage` do navegador.
- **Checkout**: o site não processa pagamentos. O formulário gera o pedido (com número `YF-DDMM-XXXX`) e abre o WhatsApp da equipa com a mensagem pronta; o pagamento (Multicaixa Express, transferência ou na entrega em Luanda) é combinado na conversa.
- Novas categorias (vestuário, acessórios, música) já existem no catálogo como “em breve”: basta adicionar produtos com essa `category` e retirar `soon`.

**Render**: como é uma SPA com rotas, o serviço precisa da regra *Rewrite* `/*` → `/index.html` (Redirects/Rewrites no dashboard).

## Conteúdo

Os dados (alinhamento, elenco, vídeos, links) estão em `src/data.ts`. As imagens em `public/media` são fotogramas dos vídeos oficiais do canal da Young Family no YouTube e a capa do álbum *Don & Don*.
