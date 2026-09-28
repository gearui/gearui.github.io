---
layout: home
title: GearUI Kit
titleTemplate: Kotlin Multiplatform UI component library

hero:
  name: GearUI Kit
  text: One UI codebase. Android, iOS, Web.
  tagline: A Kotlin Multiplatform UI component library — 71 components, a tokenised design system and the runtime that holds them together. Published on Maven Central.
  image:
    src: /logo.png
    alt: GearUI Kit
  actions:
    - theme: brand
      text: Get started
      link: /gearui-kit/guide/getting-started
    - theme: alt
      text: Components
      link: /gearui-kit/guide/components
    - theme: alt
      text: GitHub
      link: https://github.com/gearui/gearui-kit

features:
  - icon: 🧩
    title: 71 components, 6 categories
    details: Buttons to bottom sheets, pickers to tours. Every one ships a demo page in the sample app, and the index on this site is generated from that same registry.
    link: /gearui-kit/guide/components
    linkText: Browse the index
  - icon: 📐
    title: Design tokens with teeth
    details: Colour, radius, elevation, spacing, border and icon size are named scales. CI rejects literals in component code, so a theme change re-skins every screen and forty components never drift into forty radii.
    link: /gearui-kit/guide/theming
    linkText: Theming & tokens
  - icon: 🧭
    title: Runtime included
    details: One App root wires theme, i18n, the overlay host and a stabilised safe-area pipeline. Dialogs escape clipped lists, banners don't freeze the screen, the keyboard never leaks into page padding.
    link: /gearui-kit/guide/app-root
    linkText: App root & runtime
  - icon: 🌐
    title: Truly multiplatform
    details: The same commonMain renders through native views on Android and iOS and through the DOM on the Web. No per-platform component forks.
    link: /gearui-kit/guide/platforms
    linkText: Platforms
  - icon: 🌏
    title: i18n built in
    details: Language packs resolved from a BCP 47 tag, domain-split so nothing hits Android's DEX limits, and downstream libraries plug into the same pipeline. Apps set the language once.
    link: /gearui-kit/guide/i18n
    linkText: Internationalisation
  - icon: 📦
    title: One coordinate
    details: implementation("com.gearui:gearui-kit:1.0.0-beta6") in commonMain. Gradle resolves the Android, iOS and JS artifacts from the module metadata.
    link: /gearui-kit/guide/getting-started
    linkText: Getting started
---

<div class="home-shots">
  <figure><img src="/gearui-kit/home-zh.png" alt="Component index, Chinese" /><figcaption>Home · 中文</figcaption></figure>
  <figure><img src="/gearui-kit/home-en.png" alt="Component index, English" /><figcaption>Home · English</figcaption></figure>
  <figure><img src="/gearui-kit/settings-light.png" alt="Settings, light theme" /><figcaption>Settings · light</figcaption></figure>
  <figure><img src="/gearui-kit/settings-dark.png" alt="Settings, dark theme" /><figcaption>Settings · dark</figcaption></figure>
</div>
<p class="home-shots-note">Captured from the sample app on an iPhone 17 Pro Max simulator (iOS 26.2). Language and theme switch at runtime; every component follows.</p>

<style scoped>
.home-shots { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; max-width: 1152px; margin: 56px auto 0; padding: 0 24px; }
.home-shots figure { margin: 0; }
.home-shots img { width: 100%; border-radius: 14px; border: 1px solid var(--vp-c-divider); }
.home-shots figcaption { text-align: center; font-size: 0.85em; color: var(--vp-c-text-2); margin-top: 8px; }
.home-shots-note { max-width: 1152px; margin: 12px auto 48px; padding: 0 24px; text-align: center; color: var(--vp-c-text-2); font-size: 0.9em; }
</style>
