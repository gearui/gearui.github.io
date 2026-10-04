# 图标

GearUI Kit 内置全部 [Phosphor](https://phosphoricons.com) 图标，regular 与 fill 两种，以带类型的 Kotlin 属性提供。

```kotlin
import com.gearui.components.icon.*

Icon(Icons.xCircle)
Icon(Icons.heart, fill = liked, tint = Theme.colors.destructive)
Icon(Icons.house, size = IconSizes.Display.lg)
```

| 参数 | 默认值 | 含义 |
| --- | --- | --- |
| `icon` | — | 一个 `IconSource`：`Icons.*`，或你自己的图标集 |
| `size` | `IconSizes.Default.lg` | 图标标度中的一档（见[主题与 Token](./theming)） |
| `tint` | `Theme.colors.foreground` | 不用每处传颜色，自动适配深浅色；`Color.Unspecified` 保留图片原色 |
| `fill` | `false` | 使用图标的 fill 形态；没有 fill 形态的图标保持 regular |

和 Compose 的 Material 图标一样需要这行 import：每个图标都是 `Icons` 上的扩展属性。

## 组件参数里的图标

凡是显示图标的组件参数都接收 `IconSource`。参数没有 `fill` 开关，用 `.filled` 指定 fill 形态：

```kotlin
Button(text = "点赞", icon = Icons.heart, onClick = { … })
BottomNavItem(id = "home", label = "首页", icon = Icons.house, selectedIcon = Icons.house.filled)
```

## 图标是怎么实现的

图标是路径数据，由 Phosphor 的 SVG 生成，GearUI 在画布上绘制：任意尺寸都清晰，App 不需要图片文件、字体，也不需要拷贝资源的构建步骤。

只有代码里写到的图标才会进入 App。没有按字符串查找图标的入口，所以编译器可以去掉所有没被引用的图标：

| 平台 | 未使用的图标是否被去掉 |
| --- | --- |
| iOS、鸿蒙 | 总是（Kotlin/Native） |
| Web | 总是（Kotlin/JS） |
| Android | 开启 R8 时（`isMinifyEnabled = true`）；不开时整套约 2 MB 代码 |

## 自定义图标

任何成员返回 `IconSource` 的对象都是一个图标集，凡是能用内置图标的地方都能用它。路径数据用 `VectorIcon`，App 自带的图片用 `ImageIcon`：

```kotlin
object AppIcons {
    val logo: IconSource
        get() = ImageIcon("logo", "assets://icons/logo.png", fill = "assets://icons/logo_fill.png")
    val spark: IconSource
        get() = VectorIcon("spark", "M128 16L…Z", fill = "M…Z")
}

Icon(AppIcons.logo, tint = Color.Unspecified)
Icon(AppIcons.spark, fill = selected)
```

图标要声明成 getter（`get() =`），不要用存储属性：对象的存储属性会一起初始化，用到一个图标就会把整套留在 App 里。

`VectorIcon` 接收 256 单位正方形内的绝对坐标 `M`、`L`、`Q`、`C`、`Z` 命令（其他尺寸传 `viewport`）。Kit 仓库的 `scripts/gen_vector_icons.py` 可以从 SVG 生成，用 `--receiver` 和 `--package` 可以生成一整套。

## 从 beta7 升级

beta7 及以前，图标是 PNG 资源，`Icons.*` 是字符串形式的图标名。

| beta7 | beta8 |
| --- | --- |
| `Icon(Icons.x_circle)` 或 `Icon("x_circle")` | `Icon(Icons.xCircle)` |
| `icon = Icons.star`（`String`） | `icon = Icons.star`（`IconSource`） |
| `Icon(Icons.star_fill)` | `Icon(Icons.star, fill = true)` |
| `tint = null` 表示保留图片原色 | `tint` 默认前景色；要保留图片原色传 `Color.Unspecified` |
| 把 Kit 的 PNG 拷进 App 的 Gradle 任务 | 删掉 |
| App 自己按名字引用的 PNG | `ImageIcon("name", "assets://icons/name.png")` |
