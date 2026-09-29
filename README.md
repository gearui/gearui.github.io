# gearui.com

Source of [gearui.com](https://gearui.com), the GearUI organisation site. Built with [VitePress](https://vitepress.dev), deployed to GitHub Pages on every push to `main`.

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # -> docs/.vitepress/dist
```

## Layout

```
docs/
├── index.md                  /                English landing (products)
├── gearui-kit/               /gearui-kit/     product home + guide/
├── zh-Hans/                  /zh-Hans/…       the same tree in Simplified Chinese
├── public/                   static: logo, favicon, og image, screenshots, CNAME
└── .vitepress/config.ts      locales, nav, per-product sidebars
scripts/sync-gearui-kit.mjs   regenerates guide/components.md (both locales) + screenshots
```

## Interactive Web sample

The home hero embeds the GearUI Kit Web sample from `/gearui-kit/demo/`. The
Pages workflow checks out the **pinned GearUI Kit commit** in
`.github/workflows/deploy.yml`, builds its production JS bundles, and copies
only the runnable files into the Pages artifact. Generated bundles are not
committed here. The current site release text describes the published beta6;
the embedded sample is a development preview and may contain newer components.

To reproduce the Pages artifact locally with GearUI Kit at `../gearui-kit`:

```bash
pnpm build
(cd ../gearui-kit && ./gradlew :sample:jsApp:jsBrowserProductionWebpack)
(cd ../gearui-kit && ./gradlew :sample:jsBrowserProductionWebpack)
pnpm build:web-demo ../gearui-kit
pnpm preview
```

Keep the two Gradle invocations separate: the host currently stages the
development bundle, which conflicts with production sample compilation when
both tasks run in one Gradle build. The packaging step selects the production
bundle, not the staged development copy.

## Adding a product

1. `docs/<product>/index.md` and `docs/zh-Hans/<product>/index.md`
2. a nav entry and a sidebar block per locale in `config.ts`, keyed by the path prefix

Nothing else moves.

## Generated content

`docs/gearui-kit/guide/components.md` (and its zh-Hans twin) is **generated** from gearui-kit's component registry — the same source the kit's own README uses — so the site cannot claim a component count the kit does not have. Do not edit it; run:

```bash
pnpm sync:gearui-kit            # expects ../gearui-kit; or pass a path
```

## Domain

`docs/public/CNAME` pins `gearui.com` — that is the one that ends up in the
deployed artifact and therefore the one that matters. GitHub also maintains a
`CNAME` at the repository root when you set the custom domain in Pages
settings; with an Actions deploy it is not used, so if the two ever disagree,
`docs/public/CNAME` wins. DNS points the apex at GitHub Pages' A records and `www` at `gearui.github.io`. Putting a CDN in front later is a DNS-only change; nothing in this repo cares.
