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

The home hero embeds the GearUI Kit Web sample from `/gearui-kit/demo/` via
`docs/.vitepress/theme/DemoPhone.vue`. Both language versions use the same
demo. This is a **development preview**, not the published beta named in the
site release text; updating the demo does not change the advertised release.

### Deployment rules

- A push to this site's `main` branch, or a manual `workflow_dispatch`, runs
  `.github/workflows/deploy.yml`. GitHub Pages must use **GitHub Actions** as
  its build/deployment source. The workflow builds VitePress and the Web
  sample, uploads one artifact, then deploys it to `gearui.com`.
- The workflow checks out `gearui/gearui-kit` at the **full commit SHA** in its
  second `actions/checkout` step. A push to `gearui-kit` alone does **not**
  update the website. Do not replace the SHA with `main`: the site should be
  reproducible and a broken Kit commit should not silently reach production.
- The workflow builds `:sample:jsApp:jsBrowserProductionWebpack` (Web host)
  and `:sample:jsBrowserProductionWebpack` (sample UI) in **separate Gradle
  invocations**. Running them together currently lets the host's staged
  development bundle conflict with the production sample bundle.
- `scripts/build-web-demo.mjs` copies the sample's `index.html`, production
  `jsApp.js`, production `gearui_sample.js`, and generated `assets/` into
  `docs/.vitepress/dist/gearui-kit/demo/`. The uploaded Pages artifact is
  `docs/.vitepress/dist`; generated bundles are **not committed**.
- `docs/public/CNAME` sets the deployed custom domain. Keep it as
  `gearui.com` when editing the Pages setup.

### Update the live Web sample

1. Commit and push the desired changes in `gearui/gearui-kit`. Verify that
   commit's Web sample builds and works before selecting it for the website.
2. In this repository, replace the full `ref` SHA in
   `.github/workflows/deploy.yml` with the Kit commit to publish. If component
   counts or screenshots changed, also run `pnpm sync:gearui-kit` against that
   checkout and review the generated site content.
3. Build and preview the **same Kit commit** locally using the commands below.
   Check the home-page iframe and the standalone `/gearui-kit/demo/` page,
   including navigation, interactions, and asset loading at phone width.
4. Commit and push the site change to `main` (or dispatch the workflow after
   the SHA is already on `main`). Wait for both `build` and `deploy` jobs to
   succeed in GitHub Actions. A manual rerun without changing the pinned SHA
   rebuilds the **old** demo; it does not pick up Kit's latest `main`.
5. Verify [gearui.com](https://gearui.com/) and the
   [standalone demo](https://gearui.com/gearui-kit/demo/) after deployment.
   Check that the selected UI change is present and that `jsApp.js`,
   `gearui_sample.js`, and assets load without errors. If a cached bundle is
   shown, reload the page before deciding the deployment failed.

To roll back, restore the last known-good Kit SHA in the workflow and push
that site commit. Do not roll back only the site's prose while leaving a bad
demo SHA pinned.

To reproduce the Pages artifact locally, first check out the **pinned SHA** in
`../gearui-kit` (without discarding any work in that checkout), then run from
this site's repository root:

```bash
pnpm install --frozen-lockfile
pnpm build
(cd ../gearui-kit && ./gradlew :sample:jsApp:jsBrowserProductionWebpack)
(cd ../gearui-kit && ./gradlew :sample:jsBrowserProductionWebpack)
pnpm build:web-demo ../gearui-kit
pnpm preview
```

`pnpm preview` serves the assembled `docs/.vitepress/dist` artifact; `pnpm dev`
alone does not build or serve the generated demo. The packaging step selects
the production bundle, not the host's staged development copy.

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
