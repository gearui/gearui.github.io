# 快速开始

GearUI Kit 是一个 Kotlin Multiplatform 库。往 `commonMain` 加一个依赖，挂一个根 composable，然后对着 `com.gearui.*` 写页面。

## 环境要求

| | 版本 |
| --- | --- |
| Kotlin | 2.1.21（必须与 KuiklyUI 一致） |
| Compose Multiplatform | 1.7.3 |
| KuiklyUI | 2.27.0（`compose:2.27.0-2.1.21`） |
| Android | minSdk 21，compileSdk 34 |
| iOS | 14.0+，arm64 / 模拟器 arm64 / x64 |
| JS | 浏览器，IR |

Kotlin 版本没有商量余地：KuiklyUI 的产物按 Kotlin 版本发布，不匹配会在依赖解析阶段失败，而不是运行时。

## 添加依赖

```kotlin
// build.gradle.kts
repositories { mavenCentral() }

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("com.gearui:gearui-kit:1.0.0-beta1")
        }
    }
}
```

只声明根坐标。Gradle 读 module metadata，按当前编译目标自动解析到对应平台包（`gearui-kit-android`、`-js`、`-iosarm64`…）。那些带后缀的坐标不要手写。

::: details 用本地 checkout 而不是 Maven Central
```bash
./gradlew :gearui-kit:publishToMavenLocal   # 在 gearui-kit 仓库里
```
然后在 repositories 里把 `mavenLocal()` 放在 `mavenCentral()` 前面。或者用 composite build：
```kotlin
// settings.gradle.kts
includeBuild("../gearui-kit") {
    dependencySubstitution {
        substitute(module("com.gearui:gearui-kit")).using(project(":gearui-kit"))
    }
}
```
:::

## 挂根节点

GearUI Kit 的一切都假定自己在 `App` 里面。它提供主题、语言环境、浮层宿主（对话框、底部面板、toast）以及稳定化的安全区管线。

最简单的方式是继承 `View`，它替你包好 `App`：

```kotlin
import com.gearui.View
import com.tencent.kuikly.core.annotations.Page

@Page("MainPage")
class MainPage : View() {
    @Composable
    override fun Content() {
        MainPageContent()
    }
}
```

如果你要自己控制根——比如主题和语言由你自己的设置驱动——直接调 `App`，并在 `View` 上把 `autoWrapApp` 设为 `false`：

```kotlin
App(
    themeMode = ThemeMode.System,
    isSystemDark = isSystemDark,          // 由你的平台层提供
    languageTag = "zh-Hans",              // 语言唯一的设置点
) {
    MainPageContent()
}
```

整棵树里必须**恰好一个** `App`。往下再嵌一个会覆盖它之下所有内容的运行时 flag。

## 写一个页面

```kotlin
@Composable
fun MainPageContent() {
    val colors = Theme.colors
    val strings = I18n.strings

    PageScaffold {
        NavBar(title = strings.buttonConfirm)
        Column(Modifier.padding(Spacing.lg)) {
            Button(
                text = strings.buttonConfirm,
                theme = ButtonTheme.PRIMARY,
                onClick = { /* … */ },
            )
        }
    }
}
```

三个习惯——库自己的 CI 对自己强制执行，也建议带进你的 App：

1. **第一行 `val colors = Theme.colors`**——颜色从主题读，永远不写 `Color(0x…)`。
2. **尺寸来自标度**——`Spacing.lg`、`Theme.shapes.md`、`IconSizes.Default.md`、`Elevation.raised`。不写 `16.dp`。
3. **`PageScaffold` 是页面根**——安全区由它消费。别手读 `safeAreaInsets`。

## 运行 sample

仓库自带一个 sample，每个组件都有演示页：

```bash
git clone https://github.com/gearui/gearui-kit
cd gearui-kit
./gradlew :sample:installDebug                    # Android
./gradlew :sample:jsApp:jsBrowserDevelopmentRun   # Web → http://localhost:8081/
open sample/iosApp/GearUISample.xcworkspace       # iOS（先 ./gradlew :sample:syncFramework && pod install）
```
