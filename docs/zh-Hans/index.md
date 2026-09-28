---
layout: home
title: GearUI Kit
titleTemplate: Kotlin Multiplatform UI 组件库

hero:
  name: GearUI Kit
  text: 一套 UI 代码。Android、iOS、Web。
  tagline: Kotlin Multiplatform UI 组件库——72 个组件、token 化的设计系统，以及把它们粘在一起的运行时。已发布到 Maven Central。
  image:
    src: /logo.png
    alt: GearUI Kit
  actions:
    - theme: brand
      text: 快速开始
      link: /zh-Hans/gearui-kit/guide/getting-started
    - theme: alt
      text: 组件
      link: /zh-Hans/gearui-kit/guide/components
    - theme: alt
      text: GitHub
      link: https://github.com/gearui/gearui-kit

features:
  - icon: 🧩
    title: 72 个组件，6 大类
    details: 从按钮到底部面板，从选择器到引导。每一个在 sample 里都有演示页，本站的组件索引就是从同一份注册表生成的。
    link: /zh-Hans/gearui-kit/guide/components
    linkText: 浏览索引
  - icon: 📐
    title: 有牙齿的设计 token
    details: 颜色、圆角、阴影、间距、描边、图标尺寸都是具名标度。CI 拒绝组件代码里的字面量，所以改一次主题所有页面换皮，四十个组件不会漂成四十种圆角。
    link: /zh-Hans/gearui-kit/guide/theming
    linkText: 主题与 Token
  - icon: 🧭
    title: 运行时内置
    details: 一个 App 根接好主题、i18n、浮层宿主与稳定化的安全区管线。对话框能逃出被裁剪的列表，横幅不冻结屏幕，键盘永远不渗进页面 padding。
    link: /zh-Hans/gearui-kit/guide/app-root
    linkText: App 根节点与运行时
  - icon: 🌐
    title: 真正的多平台
    details: 同一份 commonMain，在 Android 与 iOS 上通过原生视图渲染，在 Web 上通过 DOM 渲染。没有按平台 fork 的组件。
    link: /zh-Hans/gearui-kit/guide/platforms
    linkText: 平台支持
  - icon: 🌏
    title: i18n 内置
    details: 按 BCP 47 标签解析语言包，按域拆分不撞 Android DEX 上限，下游库接同一条管线。App 只设一次语言。
    link: /zh-Hans/gearui-kit/guide/i18n
    linkText: 国际化
  - icon: 📦
    title: 一行坐标
    details: commonMain 里 implementation("com.gearui:gearui-kit:1.0.0-beta5")。Gradle 从 module metadata 自动解析 Android、iOS、JS 产物。
    link: /zh-Hans/gearui-kit/guide/getting-started
    linkText: 快速开始
---

<div class="home-shots">
  <figure><img src="/gearui-kit/home-zh.png" alt="中文组件索引" /><figcaption>首页 · 中文</figcaption></figure>
  <figure><img src="/gearui-kit/home-en.png" alt="英文组件索引" /><figcaption>首页 · English</figcaption></figure>
  <figure><img src="/gearui-kit/settings-light.png" alt="设置页亮色" /><figcaption>设置 · 亮色</figcaption></figure>
  <figure><img src="/gearui-kit/settings-dark.png" alt="设置页暗色" /><figcaption>设置 · 暗色</figcaption></figure>
</div>
<p class="home-shots-note">在 iPhone 17 Pro 模拟器上运行 sample 截取。语言与主题运行时切换，所有组件自动跟随。</p>

<style scoped>
.home-shots { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; max-width: 1152px; margin: 56px auto 0; padding: 0 24px; }
.home-shots figure { margin: 0; }
.home-shots img { width: 100%; border-radius: 14px; border: 1px solid var(--vp-c-divider); }
.home-shots figcaption { text-align: center; font-size: 0.85em; color: var(--vp-c-text-2); margin-top: 8px; }
.home-shots-note { max-width: 1152px; margin: 12px auto 48px; padding: 0 24px; text-align: center; color: var(--vp-c-text-2); font-size: 0.9em; }
</style>
