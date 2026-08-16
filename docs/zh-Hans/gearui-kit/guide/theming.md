# 主题与 Token

GearUI Kit 是**边框优先、token 驱动**的。组件自身不携带任何颜色或尺寸；它们从具名标度里读值，而库的 CI 会让任何写字面量的组件失败。这就是为什么改一次主题所有页面同时换皮，也是为什么四十个组件不会漂成四十种略微不同的圆角。

## 颜色——`Theme.colors`

`Theme.colors` 返回当前主题模式下生效的 `Colors`。名字是语义的（这个颜色**用来干什么**），不是描述性的：

| 分组 | 字段 |
| --- | --- |
| 表面 | `background` `foreground` `surface` `surfaceForeground` `card` `cardForeground` `popover` `popoverForeground` `muted` `mutedForeground` |
| 品牌 | `primary` `primaryForeground` `secondary` `secondaryForeground` `accent` `accentForeground` |
| 状态 | `destructive` `success` `warning` `info`——各带一个 `…Foreground` |
| 结构 | `border` `input` `ring` |

每个 `X` 都配一个保证在它之上可读的 `XForeground`。实心 `primary` 按钮上的文字是 `primaryForeground`，不是「白色」。

```kotlin
val colors = Theme.colors           // 永远是组件的第一行
Text(text, color = colors.mutedForeground)
Box(Modifier.background(colors.surface).border(BorderWidth.thin, colors.border))
```

### 模式与自定义主题

```kotlin
App(themeMode = ThemeMode.System, isSystemDark = isSystemDark) { … }   // Light | Dark | System
App(themeMode = ThemeMode.Dark, theme = MyThemes.DarkPurple) { … }    // 你自己的 ThemeSpec
```

`ThemeSpec` 是包着 `Colors` 的 data class；内置的是 `Themes.Light` 与 `Themes.Dark`。sample 带了一个 `DarkPurple` 示范自定义主题长什么样。中性灰是纯中性（R = G = B）；旧的带蓝味 zinc 灰阶已经移除。

## 六条标度

一切以 `dp` 计量的值都来自其中一条。有两条彼此数字撞车，这恰恰是它们必须分开成不同类型的原因——见阴影下面的提示。

### 间距——`Spacing.*`

8px 网格。用于 padding、间隙、偏移。

| `none` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` | `xxxl` | `huge` | `massive` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 |

`md`（12dp）是最常用的一档。

### 圆角——`Theme.shapes.*` / `Radius.*`

六档。`Theme.shapes` 给 `Shape` 实例用于 `Modifier.clip`；`Radius` 给同样的值的 `Dp` 形式用于 token 代码。两者不可能不一致。

| `none` | `sm` | `md` | `lg` | `xl` | `full` |
| --- | --- | --- | --- | --- | --- |
| 0 | 4 | 6 | 8 | 12 | 9999（胶囊） |

输入框与默认表面在 `md`；按钮与卡片在 `lg`；底部面板在 `xl`。离档值吸附到最近一档——标度不增长。

### 阴影——`Elevation.*`

GearUI 边框优先：**平贴在页面上的东西不投影。** 卡片、单元格、输入框用 `colors.border` 区分层次。阴影的意思是「这个浮在页面之上」，所以只有浮层类组件用。

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

`thin` 是输入框族的默认。刻意**没有焦点态档位**：焦点时变粗的边框会改变内容盒尺寸、导致布局跳动。

### 图标尺寸——`IconSizes.*`

两组，因为它们回答的是不同问题。`Default` 挨着文字排；`Display` 是插图。

| `Default.xs` | `.sm` | `.md` | `.lg` | `.xl` |  | `Display.sm` | `.md` | `.lg` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 14 | 16 | 18 | 24 |  | 28 | 36 | 40 |

### 字体——`Typography.*`

语义文本样式：`DisplayLarge`… `HeadlineMedium`… `TitleSmall`… `BodyMedium`（最常用，14sp/22sp）、`MarkMedium`（加粗正文）、`LinkMedium`、`Caption`、`Label`。永远不在 `Text` 上设 `fontSize`；选一个样式。

## 护栏检查什么

仓库每次 push 跑 18 条检查。对使用者有意义的是这几条，因为它们定义了什么叫「正确地使用 GearUI」：

- 组件代码里没有 `Color(0x…)`
- `RoundedCornerShape(...)`、`.border(...)`、`elevation = ...`、图标 `size = ...` 里没有字面量 `dp`
- 没有拿 `Spacing.*` 当圆角或阴影
- 文本上没有 `fontSize =`
- 没有拿 emoji 或符号字符当图标（它们不吃 `tint`，也绕过图标管线）

你不必在自己的 App 里跑这些，但它们是组件看起来一致的原因，照抄这个习惯很便宜。
