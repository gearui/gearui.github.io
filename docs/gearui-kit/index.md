---
title: GearUI Kit
titleTemplate: Kotlin Multiplatform UI component library
---

<div class="kit-hero">
  <img src="/logo.png" alt="GearUI Kit" width="96" height="96" />
  <div>
    <h1>GearUI Kit</h1>
    <p>A Kotlin Multiplatform UI component library built on Kuikly. Write a screen once in <code>commonMain</code>; it renders natively on Android and iOS and through the DOM on the Web.</p>
    <p class="kit-badges">
      <a href="https://central.sonatype.com/artifact/com.gearui/gearui-kit"><img alt="Maven Central" src="https://img.shields.io/maven-central/v/com.gearui/gearui-kit?label=Maven%20Central&color=2ea44f" /></a>
      <a href="https://github.com/gearui/gearui-kit/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-BSD--3--Clause-blue" /></a>
      <a href="https://github.com/gearui/gearui-kit"><img alt="GitHub" src="https://img.shields.io/github/stars/gearui/gearui-kit?style=flat&label=GitHub" /></a>
    </p>
  </div>
</div>

<div class="kit-actions">

[Get started →](/gearui-kit/guide/getting-started) · [Components](/gearui-kit/guide/components) · [Source on GitHub](https://github.com/gearui/gearui-kit)

</div>

## At a glance

```kotlin
commonMain.dependencies {
    implementation("com.gearui:gearui-kit:1.0.0-beta1")
}
```

- **72 components** in 6 categories — every one has a demo page in the sample app
- **Design tokens with teeth** — colour, radius, elevation, spacing, border and icon size are named scales; CI rejects hardcoded literals in component code
- **Runtime included** — `App` root wires theme, i18n, overlay host and a stabilised safe-area pipeline in one call
- **i18n built in** — language packs resolved from a BCP 47 tag, domain-split so no class hits Android's DEX limits, and downstream libraries plug into the same pipeline
- **Android · iOS · Web** — one `commonMain`; HarmonyOS is scaffolded, not yet built

## Screenshots

Captured from the sample app on an iPhone 17 Pro simulator. Language and theme are switched at runtime from the settings page; every component follows.

<div class="kit-shots">
  <figure><img src="/gearui-kit/home-zh.png" alt="Component index, Chinese" /><figcaption>Home · 中文</figcaption></figure>
  <figure><img src="/gearui-kit/home-en.png" alt="Component index, English" /><figcaption>Home · English</figcaption></figure>
  <figure><img src="/gearui-kit/settings-light.png" alt="Settings, light theme" /><figcaption>Settings · light</figcaption></figure>
  <figure><img src="/gearui-kit/settings-dark.png" alt="Settings, dark theme" /><figcaption>Settings · dark</figcaption></figure>
</div>

## Why it exists

Compose Multiplatform gives you one language for UI. It does not give you a component library that looks like a finished product on day one, or a design system that stays consistent once ten people are committing. GearUI Kit is the layer above the renderer: the components, the tokens, the runtime plumbing (overlays, safe area, keyboard, i18n) and the CI guardrails that keep all of it from drifting.

It is used in production by [PrivChat](https://github.com/privchat)'s shared UI layer, which is where most of the components were shaped.

## Where to go next

- [Getting started](/gearui-kit/guide/getting-started) — add the dependency and mount the `App` root
- [Platforms](/gearui-kit/guide/platforms) — what is verified on each target
- [Theming & tokens](/gearui-kit/guide/theming) — the six scales and how to read them
- [Components](/gearui-kit/guide/components) — the full index

<style scoped>
.kit-hero { display: flex; gap: 24px; align-items: flex-start; margin: 8px 0 16px; }
.kit-hero img { flex: none; margin-top: 12px; }
.kit-hero h1 { margin: 0 0 8px; }
.kit-hero p { margin: 0 0 8px; }
.kit-badges { display: flex; gap: 8px; flex-wrap: wrap; }
.kit-badges img { height: 20px; }
.kit-actions { margin: 0 0 24px; font-size: 1.05em; }
.kit-shots { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin: 16px 0; }
.kit-shots figure { margin: 0; }
.kit-shots img { width: 100%; border-radius: 12px; border: 1px solid var(--vp-c-divider); }
.kit-shots figcaption { text-align: center; font-size: 0.85em; color: var(--vp-c-text-2); margin-top: 6px; }
@media (max-width: 640px) { .kit-hero { flex-direction: column; } }
</style>
