---
title: 与 Flutter、React Native 和普通 KMP 的对比
titleTemplate: GearUI Kit
---

# 与 Flutter、React Native 和普通 KMP 的对比

没人听说过 GearUI Kit，但每个人都用 Flutter、React Native 或 Compose Multiplatform 发过版。所以这一页把整套栈——**GearUI Kit + KuiklyUI + Kotlin Multiplatform**——放到你已经熟悉的三样东西旁边，说清哪里领先、哪里落后、为什么。

读这页有两条规则。第一，它是**栈对栈**的比较：Flutter 是一门语言、一个引擎、一套 widget；React Native 是一门语言、一座桥、一套组件；我们是一门语言、一个原生视图渲染器、一个组件库。只拿组件库去比，是往另一个方向不诚实。第二，这套栈有**两层、两个归属**，下面每一条都写明属于哪一层。KuiklyUI 做的是腾讯的工作、腾讯的测量；GearUI Kit 在其上加的是我们的，而且只在我们量过的地方才写。

## 一分钟版本

| | GearUI Kit + KuiklyUI + KMP | 普通 KMP（Compose MP） | Flutter | React Native |
|---|---|---|---|---|
| 渲染 | ✅ 全部是真实原生视图 | Android 原生；iOS 画布 | 自带引擎，全平台画布 | 真实原生视图 |
| 原生控件：输入法、自动填充、辅助功能、文本选择 | ✅ 系统自带 | iOS 上重实现 | 全部重实现；原生视图要「嵌」进去 | 系统自带 |
| 跟随系统设计升级（iOS 26） | ✅ 系统发布当天即得 | iOS 上等重画 | 等框架重画 | 系统发布当天即得 |
| 性能 | ✅ 首屏 122ms vs 原生 125ms · SDK 300KB / 1.2MB ¹ | Skiko | 引擎，MB 级 | JS 引擎 + bundle |
| 平台调试工具 | ✅ 每个视图可见、可归因；Android 上就是原生天花板 | Android 可见，iOS 黑盒 | 黑盒 FlutterView，只能 DevTools | 可见，但要对两条栈 |
| 语言 | Kotlin，与 Android 团队和 JVM 后端共享 | Kotlin | Dart | JS / TS |
| 默认视觉 | ✅ iOS 26 基线，四端一致，72 个组件 | Material 3 | Material；Cupertino 是二等公民 | 无 |
| 设计一致性 | ✅ Token 由 23 条 CI 护栏强制 | 无 | 可主题化，不强制 | 无 |
| HarmonyOS | ✅ 官方目标平台 | 无 | 社区分支 | 华为维护的分支 |
| 生态与成熟度 | 小 · beta1（KuiklyUI 在腾讯产线承载 5 亿 DAU） | 中 | **大 · 2017 起** | **极大 · 2015 起** |

¹ 腾讯官方在鸿蒙上的实测，华为 Mate 60，复杂 Feed 流场景——[出处](https://news.qq.com/rain/a/20250603A05YV000)。

最后一行故意加粗。如果你不信我们会认这一条，就没理由信上面九条。

## 原生视图：大部分差异的根

KuiklyUI 把每一个 Compose 节点映射成真实的平台视图——iOS 上是 `UIView`，Android 上是 `android.view.View`，鸿蒙上是 ArkUI，Web 上是 DOM（[架构](https://kuikly.tds.qq.com/Introduction/arch.html)）。Flutter 用自己的引擎把 widget 画在自己的画布上。Compose Multiplatform 在 Android 上是原生 Compose，在 iOS 上是 Skiko 画布——所以 iOS 上它和 Flutter 处境相同。React Native 渲染的是原生视图，这一点和我们一样。

上面表里大多数行，都是这一个事实的推论。

**「Flutter 不支持原生控件」是错误的说法，正确的说法反而更狠。** Flutter *能*承载原生视图——`AndroidView`、`UiKitView`——但每一个都是带价格的特例：Hybrid Composition 或 Texture 两种模式各有取舍；z-order、裁剪、手势仲裁、键盘、线程都要额外处理；WebView、地图、视频、广告位是 Flutter 应用多年积累 bug 的地方。这些代价 Flutter 自己的文档就写着（[Android](https://docs.flutter.dev/platform-integration/android/platform-views)、[iOS](https://docs.flutter.dev/platform-integration/ios/platform-views)）。这套栈没有「嵌入」原生视图这个概念。每一个视图本来就是原生的。

### 这带来了什么——KuiklyUI 这一层

| 痛点 | Flutter | React Native | 普通 KMP | 这套栈 |
|---|---|---|---|---|
| 原生视图 | 画布；原生视图靠嵌入，每个都是特例 | 原生 | Android 原生；**iOS 画布，处境同 Flutter** | 全部原生，无需嵌入 |
| 文本输入——中文组词、自动填充、密码管理器、系统的选择手柄和长按菜单 | 自己实现的 `EditableText`；中文输入法组词是长期的 bug 来源 | 原生 | iOS 上重实现，已知弱项 | 原生 `UITextField` / `EditText` |
| 辅助功能——VoiceOver、TalkBack | 自建语义树再桥接 | 原生 | iOS 上桥接 | 原生 |
| 滚动物理与系统效果——iOS 回弹、Android 12 拉伸、点状态栏回顶 | 逐项模仿 | 原生 | iOS 上模仿 | 原生 |
| 跟随系统设计语言——iOS 26 Liquid Glass、动态字号、深色材质 | 等框架重画 | 自动 | iOS 上等 | **随系统升级一起到来** |
| 平台调试工具 | FlutterView 是黑盒，只能 DevTools | 可见 | iOS 上黑盒 | Xcode View Debugger、Layout Inspector、Perfetto 看到真实视图 |
| SDK 体积 | 自带引擎，MB 级 | JS 引擎 + bundle | Skiko | Android ~300KB（AOT）· iOS ~1.2MB |
| 渐进接入既有原生 App | 整个 App，或一个 Flutter 模块 | 可嵌入 | 可以 | 逐页接入——腾讯就是这么用的：20+ 产品、1000+ 页面、5 亿 DAU |
| HarmonyOS | 社区分支 | 华为维护的分支 | 无 | 官方目标平台 |

「跟随系统」那一行值得单独说一句。iOS 26 刚发布。画布方案上的 App 在框架重画之前都还是去年的样子；原生视图方案上的 App 什么都没做，就有了。

## GearUI Kit 在其上加的东西

KuiklyUI 是渲染器。它不提供一个第一天就像成品的组件库，不提供十个人同时提交后仍能保持一致的设计系统，也不提供每个 App 都得重新解决一遍的运行时管线。那一层是我们的。

### 组件与设计系统

| 痛点 | Flutter / React Native / Compose MP | GearUI Kit |
|---|---|---|
| 默认就像 iOS | Flutter 默认 Material，Cupertino 是画出来的、不完整的仿品；React Native 什么都不给；Compose MP 是 Material 3 | iOS 26 基线，四端一套设计语言，72 个组件——[规范里定的](https://github.com/gearui/gearui-kit/blob/main/docs/DESIGN_SYSTEM_SPEC.md) |
| 十个人提交半年后还像一个产品 | 靠自觉 | 六条 token 标度和 **23 条 CI 护栏**：组件代码里禁字面量，圆角只能来自标度——[护栏本身](https://github.com/gearui/gearui-kit/tree/main/scripts/ci) |
| 图标 | 字体 glyph，或各 App 自己导入 | Phosphor 以图片资源内置，沿用 Phosphor 的命名，不是字体 |
| 毛玻璃这类平台效果 | 各 App 自己做 | 材质层带**降级规则**：模糊跑不了的地方退成不透明面，绝不在任意内容上留一层半透明烂片。我们还[公开了渲染器模糊能力的缺口](https://github.com/gearui/gearui-kit/blob/main/docs/UPSTREAM_KUIKLYUI_BLUR.md)——把自己依赖层的缺口公开，是被信任的一部分 |

### 运行时管线

这里每一行都是我们真踩过、真修过的 bug，不是想象出来的功能。

| 痛点 | GearUI Kit |
|---|---|
| Dialog 或 Sheet 被打开它的滚动列表裁掉 | 浮层宿主位于页面之上，逃出任何裁剪 |
| 打开的 Sheet 底下页面还在滚 | 浮层冻结其下页面；穿透型横幅除外 |
| 渲染器里安全区不是反应式的，键盘高度漏进底部 inset | 稳定化的安全区管线 |
| 点外部收键盘，结果点按钮也收、点输入框本身也收 | 输入区域自己声明豁免；不靠「事件是否被消费」去猜 |
| 语言包大了撞 Android DEX 方法数上限 | i18n 按域拆分；下游库接同一条管线 |
| 把这些都接上 | 一个 `App` 根：主题、i18n、浮层、安全区、键盘 |

### 导航与手势

| 痛点 | GearUI Kit |
|---|---|
| 切页签整棵子树销毁重建 | TabHost 保活——卡帧率 **40.4% → 4.0%**，`gfxinfo` 在 1440×3200 设备上实测 |
| 侧滑返回 | 全屏起手，微信的做法；不依赖系统边缘手势区 |
| Android 16 预测性返回悄悄切断了旧回调 | 已处理 |
| 离开页面前的「放弃修改？」 | 路由级 Pending 状态；BACK 归属明确 |
| 字符串路由 | 类型化路由 |
| Sheet 只能点取消关 | 抓手 + 拖拽关闭，跟手 1:1 |

## 调试与工具链

三件这套栈能做、Flutter 结构上做不到的事，以及一条诚实的边界。

**Android 上就是原生 Android 的天花板，一分不打折。** Kotlin 在 Android Studio 里：断点、单步、表达式求值、Profiler、Perfetto、Database Inspector、Logcat。Layout Inspector 显示的是真实的 Android 视图，因为 KuiklyUI 渲染的就是它。这不是「接近原生体验」，它*就是*原生体验。

**平台工具看得见每一个视图。** 在 Xcode 的 View Debugger 和 Instruments 里，在 Android 的 Layout Inspector 和 Perfetto 里，每个 GearUI 组件都是一个有名字、可选中、可测量的真实视图。Flutter 在所有这些工具里都是一个不透明的 `FlutterView`；性能工作只能走 DevTools，问题一旦落在原生边界上——平台视图、输入法、崩溃——你就卡在两套工具链中间。Compose Multiplatform 在 iOS 上同样是一个不透明的 Skiko 视图。

**一种语言、一个调试器、一条调用栈。** 业务逻辑在共享 Kotlin 里，同一个断点两端都断得住。没有 Dart↔原生、JS↔原生那道缝；把 JS 栈和原生栈对上，是每个 React Native 开发者的必经之痛。

**边界。** iOS 上 Kotlin/Native 的调试走 Kotlin LLDB 插件或 JetBrains 的 KMP IDE 插件。能用，在进步，但不是 Android 那个天花板。Dart 在两端调试体验一致，Flutter 的热重载是同类最强。这两点我们不否认。

| 工具链 | 这套栈 | 普通 KMP | Flutter | React Native |
|---|---|---|---|---|
| Android 调试 | Android Studio，原生天花板 | 同左 | Dart 调试器 + DevTools | JS 侧 RN DevTools，原生侧 Android Studio |
| iOS 调试 | Xcode + Kotlin LLDB 插件——能用，非天花板 | 同左 | Dart 调试器，两端一致 | JS + Xcode，两套工具链 |
| 视图检查器（View Debugger / Layout Inspector） | **每个真实视图** | Android 可见；iOS 黑盒 | 黑盒 FlutterView | 可见 |
| 平台性能工具（Instruments / Perfetto）归因到组件 | **能** | Android 能；iOS 不能 | 不能，只能 DevTools | 部分 |
| 跨端调用栈 | 一条 Kotlin 栈 | 同左 | Dart 栈 + 原生栈 | JS 栈 + 原生栈，难对上 |
| 热重载 | 未在此验证，故不写 | 有 | **同类最强** | Fast Refresh |
| 框架自带工具 | KuiklyUI 自带 Android Studio 插件（腾讯称变量查看快 40×，鸿蒙场景） | — | DevTools，很强 | RN DevTools |

## 性能

这套栈的位置很简单：**渲染器实测与原生只差几毫秒，而原生相对 Flutter 和 React Native 处在什么位置，大家本来就知道。** 所以下表给渲染器引腾讯的测量，给其余方案写机制，不编我们没跑过的数字。

| 指标 | 这套栈（KuiklyUI，腾讯实测 ¹） | Flutter | React Native |
|---|---|---|---|
| 最小 SDK 体积 | Android ~300KB（AOT）· iOS ~1.2MB | 自带渲染引擎；MB 级 | JS 引擎 + bundle |
| 首屏 | 122ms vs 原生 125ms | 引擎初始化后再绘制 | JS bundle 加载后再渲染 |
| 页面打开 vs React Native | 快 6 倍——对比的是 RN 的**鸿蒙**分支 | — | 基准 |
| 动画帧率 | 58–60 fps | **Impeller 同样能稳 60** | 取决于 JS 线程负载 |
| 内存 | 100 帧动画 +12MB；常驻额外占用接近零 | 引擎常驻 | JS 引擎常驻 |
| 系统集成 | 原生视图：辅助功能、输入法、文本选择免费 | 全部重实现 | 原生视图，免费 |

¹ 腾讯在鸿蒙上的实测，华为 Mate 60，复杂 Feed 流场景（[官方文章](https://news.qq.com/rain/a/20250603A05YV000)；毫秒、帧率、内存数字读自其图表）。SDK 体积来自 [KuiklyUI README](https://github.com/Tencent-TDS/KuiklyUI)。

这张表小心了两件事。「6 倍」比的是 React Native 的鸿蒙分支，它比你在 iOS 和 Android 上熟悉的那个 RN 年轻得多；去掉这个限定就是误导。帧率那一行没写 Flutter 掉帧——Impeller 是真的快。Flutter 的代价在启动、体积、内存和系统集成，不在 60fps。

**这些是 KuiklyUI 的数字，不是 GearUI Kit 的。** 我们这一层不是免费的。我们自己量过的唯一一个数：TabHost 保活下的页签切换卡帧率 4.0%（`gfxinfo`，Android，1440×3200）——修之前是 40.4%，那是我们这一层的成本，与别人无关。第一个用 Instruments 剖析 GearUI 页面的人会替我们验证；我们希望他验出来是真的。

## Flutter 和 React Native 领先的地方

- **生态。** pub.dev 和 npm 比 Kotlin Multiplatform 的任何东西大一到两个数量级，更不用说这套栈。
- **成熟度与履历。** Flutter 2017 起，React Native 2015 起。KuiklyUI 2025 年开源——腾讯内部有真实的产线历史，但公开的历史很短。GearUI Kit 在 beta1。
- **招人、教程、已回答的问题。** 差距很大。
- **热重载。** Flutter 的是同类最强。
- **跨平台逐像素一致。** Flutter 的画布给了它，原生视图给不了。对一个设计驱动、想在每台手机上像素相同的 App，这是优点，而且是 Flutter 的。
- **桌面端。** Flutter 和 Compose Multiplatform 有，这套栈没有。

## 选谁

**这套栈**：App 必须在 iOS 和 Android 上同时像原生，团队写 Kotlin 或与 Android 团队共享，鸿蒙在路线图上，或者需要把跨端页面一页一页嵌进既有原生 App。

**Flutter**：逐像素一致比平台质感更重要，团队已经熟 Dart，或者从零开始、想要最大的跨端生态和最好的热重载。

**React Native**：团队是 Web 团队，JS 生态就是重点，原生视图加 JS 逻辑层是可接受的取舍。

**普通 Compose Multiplatform**：Android 是主目标、iOS 能接受画布——或者作为起点，因为这里的一切都跑在同一条 Kotlin 工具链上，日后加这套栈是加一个依赖，不是重写。

## 出处

- [KuiklyUI — GitHub README](https://github.com/Tencent-TDS/KuiklyUI)——SDK 体积、原生二进制
- [KuiklyUI — 架构](https://kuikly.tds.qq.com/Introduction/arch.html)
- [腾讯：Kuikly 鸿蒙版开源——性能](https://news.qq.com/rain/a/20250603A05YV000)——6× vs RN、首屏、图表
- [Flutter — Android 平台视图](https://docs.flutter.dev/platform-integration/android/platform-views) · [iOS](https://docs.flutter.dev/platform-integration/ios/platform-views)
- [GearUI Kit — 设计系统规范](https://github.com/gearui/gearui-kit/blob/main/docs/DESIGN_SYSTEM_SPEC.md)
- [GearUI Kit — CI 护栏](https://github.com/gearui/gearui-kit/tree/main/scripts/ci)
- [GearUI Kit — KuiklyUI 模糊能力的缺口](https://github.com/gearui/gearui-kit/blob/main/docs/UPSTREAM_KUIKLYUI_BLUR.md)
- [GearUI Kit — iOS 26 对齐审计](https://github.com/gearui/gearui-kit/blob/main/docs/IOS26_PARITY_AUDIT.md)
