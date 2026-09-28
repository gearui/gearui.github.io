# 主题与 Token

GearUI Kit 是 **token 驱动**的：**HeroUI Native 是底线，平台说了算的地方跟 iOS**。组件自身不携带任何颜色或尺寸；它们从具名标度里读值，而库的 CI 会让任何写字面量的组件失败。这就是为什么改一次主题所有页面同时换皮，也是为什么四十个组件不会漂成四十种略微不同的圆角。

## 数值从哪里来

每个控件数值都遵循一条写明的规则：

- **控件内部**——按钮、输入框、Tabs、菜单、对话框卡片、Popover、圆角标度——取 HeroUI Native。
- **平台标志性控件与列表节奏**——开关、列表行高、分组卡片、分隔线——取当前 iOS 版本，在模拟器上实测而不是凭记忆（目前是 iOS 26.2：开关 63×28、行高 52pt、卡片内缩 20pt）。
- **两边都没有**——GearUI 自定，并写明理由。

每个控件 token 都在源文件里记录这个决定：两边的参考值、选了哪边、为什么。CI 会拒绝数值偏离所选来源的 token，也拒绝没有来源的新 token。完整对照表见 [COMPONENT_METRICS.zh-Hans.md](https://github.com/gearui/gearui-kit/blob/main/docs/COMPONENT_METRICS.zh-Hans.md)；规则本身见 [VISUAL_SPEC.zh-Hans.md §2](https://github.com/gearui/gearui-kit/blob/main/docs/VISUAL_SPEC.zh-Hans.md#2-数值来源)。

## 颜色——`Theme.colors`

`Theme.colors` 返回当前主题模式下生效的 `Colors`。名字是语义的（这个颜色**用来干什么**），不是描述性的：

| 分组 | 字段 |
| --- | --- |
| 表面 | `background` `foreground` `surface` `surfaceForeground` `card` `cardForeground` `popover` `popoverForeground` `muted` `mutedForeground` |
| 品牌 | `primary` `primaryForeground` `secondary` `secondaryForeground` `accent` `accentForeground` |
| 状态 | `destructive` `success` `warning` `info`——各带一个 `…Foreground` |
| 柔和状态 | `primarySoft` `successSoft` `warningSoft` `destructiveSoft`——浅色填充，各带一个 `…Foreground` |
| 结构 | `border` `input` `ring` `separator` `separatorSecondary` `segment` |

每个 `X` 都配一个保证在它之上可读的 `XForeground`。实心 `primary` 按钮上的文字是 `primaryForeground`，不是「白色」。

```kotlin
val colors = Theme.colors           // 永远是组件的第一行
Text(text, color = colors.mutedForeground)
Box(Modifier.background(colors.surface).border(BorderWidth.hairline, colors.separator))
```

### 模式与自定义主题

```kotlin
App(themeMode = ThemeMode.System, isSystemDark = isSystemDark) { … }   // Light | Dark | System
App(themeMode = ThemeMode.Dark, theme = MyThemes.DarkPurple) { … }    // 你自己的 ThemeSpec
```

`ThemeSpec` 是包着 `Colors` 的 data class；内置的是 `Themes.Light` 与 `Themes.Dark`。sample 带了一个 `DarkPurple` 示范自定义主题长什么样。中性灰是纯中性（R = G = B）。

### 相互独立的轴

品牌色、形状、字体、阴影、动效与深浅色是各自独立的轴，都传给 `App`。改其中一条不会重置另一条：

```kotlin
App(
    themeMode = ThemeMode.System,
    isSystemDark = isSystemDark,
    theme = Themes.Light.withBrandAccent(Color(0xFF7C3AED)),   // 只换品牌色
    shapes = myShapes,                                        // 圆角或直角预设
    typography = myTypography,
) { … }
```

`withBrandAccent` 替换 `primary`、它的前景色、柔和的 `primarySoft` 一对和焦点环，表面、形状、字体都不动。

## 六条标度

一切以 `dp` 计量的值都来自其中一条。有两条彼此数字撞车，这恰恰是它们必须分开成不同类型的原因——见阴影下面的提示。

### 间距——`Spacing.*`

8px 网格。用于 padding、间隙、偏移。

| `none` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` | `xxxl` | `huge` | `massive` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 |

`md`（12dp）是最常用的一档。

### 圆角——`Theme.shapes.*`

采用 HeroUI Native 的标度。`Theme.shapes` 给 `Shape` 实例用于 `Modifier.clip`；它是一条主题轴，品牌可以整体换成直角预设而不动组件。

| `none` | `sm` | `md` | `lg` | `controlLarge` | `xl` | `full` |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 8 | 12 | 14 | 16 | 24 | 9999（胶囊） |

小控件与标签在 `sm`；输入框在 `md`；按钮与卡片在 `lg`；大号控件在 `controlLarge`；对话框与浮层表面在 `xl`。本身就是胶囊形的按钮和 Tabs 用 `full`。

`Radius.*` 以 `Dp` 形式给出同一组数值，供需要数字而不是 `Shape` 的代码使用；两者读自同一份生成的几何 token。

### 阴影——`Elevation.*`

表面扁平、内容优先：层次来自 token 化的阴影与分隔线，而不是边框装饰。输入框默认无边框、带一层柔和的输入框阴影（放在卡片或面板上时传 `variant = FieldVariant.SECONDARY` 得到填充样式；输入框家族的每个组件都有这个参数）；分组列表用从文字处起始的 `separator` 分隔线分隔各行，和 iOS 一致。明显的阴影意味着「这个浮在页面之上」，所以只有浮层使用下面这几档。

| `none` | `raised` | `floating` | `modal` |
| --- | --- | --- | --- |
| 0 | 4 | 6 | 8 |

`raised` = 依附于内容的控件与贴着触发器的轻浮层（Popover、Snackbar）。`floating` = 脱离触发器的面板（Select 下拉、Notification）。`modal` = 抢焦点的层（Dialog）。

::: warning 不要拿 `Spacing.*` 当阴影
`Spacing.xs` 与 `Elevation.raised` 今天都是 4dp。它们是不同的轴；在该写阴影深度的地方写 `Spacing.xs`，编译过、看着也对，等间距标度一调就坏。CI 护栏正因如此拒绝它。
:::

### 描边宽度——`BorderWidth.*`

| `none` | `hairline` | `thin` | `thick` |
| --- | --- | --- | --- |
| 0 | 0.5 | 1 | 2 |

`hairline` 用于 `Card` 这类描边表面的轮廓。刻意**没有焦点态档位**：焦点时变粗的边框会改变内容盒尺寸、导致布局跳动。

### 图标尺寸——`IconSizes.*`

两组，因为它们回答的是不同问题。`Default` 挨着文字排；`Display` 是插图。

| `Default.xs` | `.sm` | `.md` | `.lg` | `.xl` |  | `Display.sm` | `.md` | `.lg` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 14 | 16 | 18 | 24 |  | 28 | 36 | 40 |

### 字体——`Theme.typography.*`

语义文本样式：`displayLarge`… `headlineMedium`… `titleSmall`… `bodyMedium`（最常用：Android 与 iOS 上 17/22，即 iOS 正文字号；Web 上 15/23）、`markMedium`（加粗正文）、`linkMedium`、`caption`、`label`。永远不在 `Text` 上设 `fontSize`；选一个样式。

## 护栏检查什么

仓库每次 push 跑 20 个护栏脚本，另加两项检查：生成的 token 和组件度量表必须是最新的。对使用者有意义的是这几条，因为它们定义了什么叫「正确地使用 GearUI」：

- 组件代码里没有 `Color(0x…)`
- `RoundedCornerShape(...)`、`.border(...)`、`elevation = ...`、图标 `size = ...` 里没有字面量 `dp`
- 没有拿 `Spacing.*` 当圆角或阴影
- 文本上没有 `fontSize =`
- 没有拿 emoji 或符号字符当图标（它们不吃 `tint`，也绕过图标管线）

你不必在自己的 App 里跑这些，但它们是组件看起来一致的原因，照抄这个习惯很便宜。
