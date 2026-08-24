---
title: GearUI Kit
titleTemplate: Kotlin Multiplatform UI 组件库
---

<div class="kit-hero">
  <img src="/logo.png" alt="GearUI Kit" width="96" height="96" />
  <div>
    <h1>GearUI Kit</h1>
    <p>基于 Kuikly 的 Kotlin Multiplatform UI 组件库。在 <code>commonMain</code> 里把一个页面写一遍；Android 与 iOS 上以原生渲染，Web 上以 DOM 渲染。</p>
    <p class="kit-badges">
      <a href="https://central.sonatype.com/artifact/com.gearui/gearui-kit"><img alt="Maven Central" src="https://img.shields.io/maven-central/v/com.gearui/gearui-kit?label=Maven%20Central&color=2ea44f" /></a>
      <a href="https://github.com/gearui/gearui-kit/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-BSD--3--Clause-blue" /></a>
      <a href="https://github.com/gearui/gearui-kit"><img alt="GitHub" src="https://img.shields.io/github/stars/gearui/gearui-kit?style=flat&label=GitHub" /></a>
    </p>
  </div>
</div>

<div class="kit-actions">

[快速开始 →](/zh-Hans/gearui-kit/guide/getting-started) · [组件](/zh-Hans/gearui-kit/guide/components) · [GitHub 源码](https://github.com/gearui/gearui-kit)

</div>

## 一览

```kotlin
commonMain.dependencies {
    implementation("com.gearui:gearui-kit:1.0.0-beta1")
}
```

- **72 个组件**，分 6 类——每一个在 sample 里都有演示页
- **有牙齿的设计 token**——颜色、圆角、阴影、间距、描边、图标尺寸都是具名标度；CI 拒绝组件代码里的硬编码字面量
- **运行时内置**——`App` 根节点一次调用接好主题、i18n、浮层宿主与稳定化的安全区管线
- **i18n 内置**——按 BCP 47 语言标签解析语言包，按域拆分不撞 Android DEX 上限，下游库接同一条管线
- **Android · iOS · Web · 鸿蒙**——同一份 `commonMain`；鸿蒙通过并行构建配置可构建，设备端尚未验证

## 截图

在 iPhone 17 Pro 模拟器上运行 sample 截取。语言与主题都在设置页运行时切换，所有组件自动跟随。

<div class="kit-shots">
  <figure><img src="/gearui-kit/home-zh.png" alt="中文组件索引" /><figcaption>首页 · 中文</figcaption></figure>
  <figure><img src="/gearui-kit/home-en.png" alt="英文组件索引" /><figcaption>首页 · English</figcaption></figure>
  <figure><img src="/gearui-kit/settings-light.png" alt="设置页亮色" /><figcaption>设置 · 亮色</figcaption></figure>
  <figure><img src="/gearui-kit/settings-dark.png" alt="设置页暗色" /><figcaption>设置 · 暗色</figcaption></figure>
</div>

## 为什么需要它

Compose Multiplatform 给了你一种写 UI 的语言，但没给你一个第一天就像成品的组件库，也没给你一个十个人同时提交后还能保持一致的设计系统。GearUI Kit 是渲染器之上的那一层：组件、token、运行时管线（浮层、安全区、键盘、i18n），以及防止这一切漂移的 CI 护栏。

它在 [PrivChat](https://github.com/privchat) 的共享 UI 层生产使用，多数组件就是在那里打磨成型的。

## 下一步

- [快速开始](/zh-Hans/gearui-kit/guide/getting-started)——加依赖、挂 `App` 根
- [平台支持](/zh-Hans/gearui-kit/guide/platforms)——各平台验证到什么程度
- [主题与 Token](/zh-Hans/gearui-kit/guide/theming)——六条标度怎么读
- [组件](/zh-Hans/gearui-kit/guide/components)——完整索引

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
