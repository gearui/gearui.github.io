import { defineConfig, type DefaultTheme } from 'vitepress'

// Site structure
//
//   /                      English landing: GearUI Kit itself (the only product today)
//   /gearui-kit/           product home for GearUI Kit
//   /gearui-kit/guide/…    usage docs
//   /zh-Hans/…             the same tree in Simplified Chinese
//
// One product today, so the landing page IS the product page. When a second
// product arrives: a new folder under docs/ (and docs/zh-Hans/), a nav entry per
// locale, a sidebar block keyed by its path prefix, and the landing becomes an
// index of products. Nothing else moves.

const GITHUB_ORG = 'https://github.com/gearui'
const KIT_REPO = `${GITHUB_ORG}/gearui-kit`
const KIT_VERSION = '1.0.0-beta6'

// ---------------------------------------------------------------- English

const enNav: DefaultTheme.NavItem[] = [
  { text: 'Docs', link: '/gearui-kit/guide/getting-started', activeMatch: '^/gearui-kit/(?!compare)' },
  { text: 'Compare', link: '/gearui-kit/compare', activeMatch: '^/gearui-kit/compare' },
  {
    text: KIT_VERSION,
    items: [
      { text: 'Changelog', link: `${KIT_REPO}/commits/main` },
      { text: 'Maven Central', link: 'https://central.sonatype.com/artifact/com.gearui/gearui-kit' },
    ],
  },
]

const enKitSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    items: [
      { text: 'What is GearUI Kit', link: '/gearui-kit/' },
      { text: 'Compared with Flutter and RN', link: '/gearui-kit/compare' },
      { text: 'Getting started', link: '/gearui-kit/guide/getting-started' },
      { text: 'Platforms', link: '/gearui-kit/guide/platforms' },
    ],
  },
  {
    text: 'Guide',
    items: [
      { text: 'App root & runtime', link: '/gearui-kit/guide/app-root' },
      { text: 'Theming & tokens', link: '/gearui-kit/guide/theming' },
      { text: 'Internationalisation', link: '/gearui-kit/guide/i18n' },
      { text: 'Components', link: '/gearui-kit/guide/components' },
    ],
  },
  {
    text: 'Reference',
    items: [
      { text: 'Visual specification', link: `${KIT_REPO}/blob/main/docs/VISUAL_SPEC.md` },
      { text: 'Component metrics', link: `${KIT_REPO}/blob/main/docs/COMPONENT_METRICS.md` },
      { text: 'Quality gates', link: `${KIT_REPO}/blob/main/docs/COMPONENT_SPEC.md#8-executable-quality-gates` },
      { text: 'Quality & performance', link: `${KIT_REPO}/blob/main/docs/QUALITY_STATUS.md` },
      { text: 'Sample app', link: `${KIT_REPO}/tree/main/sample` },
    ],
  },
]

// ---------------------------------------------------------------- 简体中文

const zhNav: DefaultTheme.NavItem[] = [
  { text: '文档', link: '/zh-Hans/gearui-kit/guide/getting-started', activeMatch: '^/zh-Hans/gearui-kit/(?!compare)' },
  { text: '对比', link: '/zh-Hans/gearui-kit/compare', activeMatch: '^/zh-Hans/gearui-kit/compare' },
  {
    text: KIT_VERSION,
    items: [
      { text: '更新记录', link: `${KIT_REPO}/commits/main` },
      { text: 'Maven Central', link: 'https://central.sonatype.com/artifact/com.gearui/gearui-kit' },
    ],
  },
]

const zhKitSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '介绍',
    items: [
      { text: 'GearUI Kit 是什么', link: '/zh-Hans/gearui-kit/' },
      { text: '与 Flutter、RN 对比', link: '/zh-Hans/gearui-kit/compare' },
      { text: '快速开始', link: '/zh-Hans/gearui-kit/guide/getting-started' },
      { text: '平台支持', link: '/zh-Hans/gearui-kit/guide/platforms' },
    ],
  },
  {
    text: '指南',
    items: [
      { text: 'App 根节点与运行时', link: '/zh-Hans/gearui-kit/guide/app-root' },
      { text: '主题与 Token', link: '/zh-Hans/gearui-kit/guide/theming' },
      { text: '国际化', link: '/zh-Hans/gearui-kit/guide/i18n' },
      { text: '组件', link: '/zh-Hans/gearui-kit/guide/components' },
    ],
  },
  {
    text: '参考',
    items: [
      { text: '视觉规范', link: `${KIT_REPO}/blob/main/docs/VISUAL_SPEC.zh-Hans.md` },
      { text: '组件度量', link: `${KIT_REPO}/blob/main/docs/COMPONENT_METRICS.zh-Hans.md` },
      { text: '质量门禁', link: `${KIT_REPO}/blob/main/docs/COMPONENT_SPEC.zh-Hans.md#8-可执行质量门禁` },
      { text: '质量与性能', link: `${KIT_REPO}/blob/main/docs/QUALITY_STATUS.zh-Hans.md` },
      { text: 'Sample 应用', link: `${KIT_REPO}/tree/main/sample` },
    ],
  },
]

// ---------------------------------------------------------------- site

export default defineConfig({
  title: 'GearUI',
  description: 'GearUI Kit — a Kotlin Multiplatform UI component library. One codebase for Android, iOS and Web.',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://gearui.com' },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#0b0d14' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'GearUI' }],
    ['meta', { property: 'og:image', content: 'https://gearui.com/og.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: enNav,
        sidebar: { '/gearui-kit/': enKitSidebar },
        editLink: {
          pattern: 'https://github.com/gearui/gearui.github.io/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: 'GearUI Kit is released under the Apache License 2.0.',
          copyright: 'Copyright © 2026 Shanghai Boyu Information Technology Co., Ltd.',
        },
      },
    },
    'zh-Hans': {
      label: '简体中文',
      lang: 'zh-Hans',
      link: '/zh-Hans/',
      title: 'GearUI',
      description: 'Kotlin Multiplatform UI，一套代码覆盖 Android、iOS 与 Web。',
      themeConfig: {
        nav: zhNav,
        sidebar: { '/zh-Hans/gearui-kit/': zhKitSidebar },
        editLink: {
          pattern: 'https://github.com/gearui/gearui.github.io/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: 'GearUI Kit 基于 Apache License 2.0 协议发布。',
          copyright: 'Copyright © 2026 上海博宇信息科技有限公司',
        },
        docFooter: { prev: '上一页', next: '下一页' },
        outline: { label: '本页目录' },
        lastUpdated: { text: '最后更新' },
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '语言',
      },
    },
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'GearUI',
    socialLinks: [{ icon: 'github', link: GITHUB_ORG }],
    search: { provider: 'local' },
    outline: [2, 3],
  },
})
