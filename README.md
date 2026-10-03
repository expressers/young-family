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

## Conteúdo

Os dados (alinhamento, elenco, vídeos, links) estão em `src/data.ts`. As imagens em `public/media` são fotogramas dos vídeos oficiais do canal da Young Family no YouTube e a capa do álbum *Don & Don*.
