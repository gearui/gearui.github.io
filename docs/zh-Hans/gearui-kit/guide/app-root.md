# App 根节点与运行时

`App` 是每棵 GearUI Kit 树的起点。它不是主题包装器，它是运行时。一次调用挂好：

```
App(themeMode, languageTag, runtimeFlags, …)
 └── I18nRoot            LocalLanguageTag / LocalFallbackLanguageTag
      └── I18nProvider   kit 自己的字符串
           └── Theme     Theme.colors / shapes / typography
                └── ProvideRuntimeEnvironment   稳定化的安全区、键盘 inset、flag
                     └── OverlayRoot            Dialog / BottomSheet / Popover / Toast… 的宿主
                          └── 你的内容
```

## 签名

```kotlin
@Composable
fun App(
    themeMode: ThemeMode = ThemeMode.Light,      // Light | Dark | System
    isSystemDark: Boolean = false,               // 由你的平台层读取
    theme: ThemeSpec? = null,                    // 自定义配色；覆盖 themeMode 的默认
    typography: Typography = Typographies.Default,   // 其余 token 轴；彼此独立
    shapes: Shapes = ShapesDefault.Default,
    elevation: Elevation = Elevations.Default,
    motion: Motion = Motions.Default,
    languageTag: String = "en-US",
    fallbackLanguageTag: String = "en-US",
    stringsOverrides: Map<String, StringsPatch> = emptyMap(),
    runtimeFlags: RuntimeFlags = RuntimeFlags(),
    keyboardDismissMode: KeyboardDismissMode = KeyboardDismissMode.OnTapOrScroll,
    content: @Composable () -> Unit,
)
```

## 一个根，不是两个

组合树里必须恰好一个 `App`。往下再放一个会重新提供 `RuntimeFlags` 与浮层宿主，静默改变它之下所有内容的行为。`View` 已经替你包好 `App`（见[快速开始](/zh-Hans/gearui-kit/guide/getting-started#挂根节点)）；如果你自己调 `App`，在 `View` 上把 `autoWrapApp` 设为 `false`。

## 安全区

页面 chrome 通过 `PageScaffold` 消费安全区——那是唯一正确的地方。它读的是**稳定化后**的 inset，不是原始值：

- iOS 上的 Kuikly 在 Scene 尚未 active 时可能有一帧上报 top 为 0。这种瞬时 0 会被过滤；任何非零变化（通话状态栏、分屏）立即接受。
- bottom inset 忽略键盘。IME 高度单独以 `keyboard` 交付，永远不会渗进页面 padding。

组件自身从不读 `safeAreaInsets`。`NavBar`、`BottomNavBar`、`Drawer`、`ActionSheet`、`BottomSheet` 都通过 `rememberSafeAreaInset(edge)` 解析自己的那条边，行为由 `RuntimeFlags` 按组件开关：

```kotlin
RuntimeFlags(
    navBarConsumesTopSafeArea = false,          // 由 PageScaffold 负责
    bottomNavBarConsumesBottomSafeArea = true,
    drawerConsumesVerticalSafeArea = true,
    actionSheetConsumesBottomSafeArea = true,
    bottomSheetConsumesBottomSafeArea = true,
)
```

在 `App` 上设一次；不要按页面覆盖。

## 浮层

所有浮起来的东西——`Dialog`、`ConfirmDialog`、`BottomSheet`、`ActionSheet`、`Popover`、`Tooltip`、`ContextMenu`、`Toast`、`Snackbar`、`Notification`、`Tour`——都由 `App` 挂的 `OverlayRoot` 渲染。这让它们共享一套关闭策略（点外部、滚动、返回键、路由切换），按浮层声明、在一处执行，也是 `Select` 下拉能逃出被裁剪列表的原因。

两个值得知道的行为：

- **浮层滚动即关。** `GearLazyColumn`（以及任何调用 `OverlayManager.notifyScroll` 的容器）在用户拖动时通知宿主，打开的下拉不会离触发器越漂越远。
- **非模态横幅放行手势。** `Snackbar` 与 `Notification` 设 `passThroughOutside = true`；横幅显示期间屏幕其余部分照常可点、可滚。不这么做的话，全屏浮层会在通知可见的整段时间里冻结 App。

## 键盘

`keyboardDismissMode` 默认 `OnTapOrScroll`：点空白处或滚动时收起 IME。`Input` 与 `Textarea` 处理焦点的方式能扛住 Kuikly 在 modifier 链变化时重建原生 `EditText` 的倾向——这也是输入框边框颜色不能依赖焦点的原因。那是输入框族有文档记录的约束，不是风格选择。
