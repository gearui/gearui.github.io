# Getting started

GearUI Kit is a Kotlin Multiplatform library. You add one dependency to `commonMain`, mount one root composable, and write screens against `com.gearui.*`.

## Requirements

| | Version |
| --- | --- |
| Kotlin | 2.1.21 (must match KuiklyUI's) |
| Compose Multiplatform | 1.7.3 |
| KuiklyUI | 2.28.0 (`compose:2.28.0-2.1.21`) |
| Android | minSdk 21, compileSdk 36 |
| iOS | 14.0+, arm64 / simulator arm64 / x64 |
| JS | browser, IR |

The Kotlin version is not negotiable: KuiklyUI artifacts are published per Kotlin version and a mismatch fails at resolution, not at runtime.

## Add the dependency

```kotlin
// build.gradle.kts
repositories {
    mavenCentral()
    maven("https://mirrors.tencent.com/nexus/repository/maven-tencent/")  // KuiklyUI 2.x
}

kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("com.gearui:gearui-kit:1.0.0-beta8")
        }
    }
}
```

The second repository is not optional: GearUI Kit depends on KuiklyUI, and KuiklyUI 2.x is published to Tencent's Maven mirror, not Maven Central. Without it the dependency does not resolve.

Declare only the root coordinate. Gradle reads the module metadata and resolves the per-target artifact (`gearui-kit-android`, `-js`, `-iosarm64`, …) for whatever you are compiling. Never depend on those directly.

::: details Working against a local checkout instead
```bash
./gradlew :gearui-kit:publishToMavenLocal   # inside the gearui-kit repo
```
then add `mavenLocal()` before `mavenCentral()` in your repositories. Or use a composite build:
```kotlin
// settings.gradle.kts
includeBuild("../gearui-kit") {
    dependencySubstitution {
        substitute(module("com.gearui:gearui-kit")).using(project(":gearui-kit"))
    }
}
```
:::

## Mount the root

Everything in GearUI Kit assumes it is inside `App`. It provides the theme, the language environment, the overlay host (dialogs, sheets, toasts) and the stabilised safe-area pipeline.

The simplest way is to extend `View`, which wraps `App` for you:

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

If you need to control the root yourself — for example to drive theme and language from your own settings — call `App` directly and set `autoWrapApp = false` on the `View`:

```kotlin
App(
    themeMode = ThemeMode.System,
    isSystemDark = isSystemDark,          // supplied by your platform layer
    languageTag = "zh-Hans",              // the ONLY place language is set
) {
    MainPageContent()
}
```

There must be exactly one `App` in the tree. Nesting a second one overrides runtime flags for everything beneath it.

## Write a screen

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

Three habits that the library's own CI enforces on itself and that you should carry into your app:

1. **`val colors = Theme.colors` first** — colours are read from the theme, never written as `Color(0x…)`.
2. **Sizes come from scales** — `Spacing.lg`, `Theme.shapes.md`, `IconSizes.Default.md`, `Elevation.raised`. Not `16.dp`.
3. **`PageScaffold` is the page root** — it is what consumes safe area. Do not read `safeAreaInsets` by hand.

## Run the sample

The repository ships a sample with a demo page for every component:

```bash
git clone https://github.com/gearui/gearui-kit
cd gearui-kit
./gradlew :sample:installDebug                    # Android
./gradlew :sample:jsApp:jsBrowserDevelopmentRun   # Web → http://localhost:8081/
./gradlew :sample:generateDummyFramework && (cd sample/iosApp && pod install)   # iOS, once
open sample/iosApp/GearUISample.xcworkspace       # then build the GearUISample scheme
```
