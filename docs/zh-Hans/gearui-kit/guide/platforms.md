# 平台支持

| 平台 | 库 | Sample | CI |
| --- | --- | --- | --- |
| Android | ✅ | ✅ | ✅ |
| iOS | ✅ | ✅ | ✅ |
| Web (H5) | ✅ | ✅ | ✅ |
| 鸿蒙 | ✅ | ✅ 可构建 | — |

## Android 与 iOS

两者都通过 KuiklyUI 的原生渲染器渲染——是真正的平台视图，不是画布。发布产物是 `gearui-kit-android`（AAR）和三个 iOS klib（`iosarm64` / `iossimulatorarm64` / `iosx64`）；Gradle 从根坐标自动挑。

iOS 的 sample 是 CocoaPods 宿主。照抄之前有个坑要知道：`pod install` 必须在 Gradle 构建出 framework **之后**跑，否则 CocoaPods 看到的是空资源目录，会静默删掉拷贝阶段——App 照常构建、照常运行，只是 App 自带的图片全都缺失。仓库里有一条 CI 检查专门盯这个。GearUI 的图标是代码，不受它影响。

## Web

Web 目标通过 KuiklyUI 的 web 渲染器（`core-render-web`）运行。sample 的 `jsApp` 宿主能运行全部示例页：每一页在浅色和深色下都能正常加载、滚动、在手机与桌面宽度之间切换而不报错，并且在 320 宽的屏幕上显示完整。

宿主不能带 UMD wrapper——sample 的 `webpack.config.d/output.js` 把它关掉了。不关的话 kotlin-webpack 的 UMD 尾部会整体替换 `window.com`，渲染桥就没了；症状是 `callNative is not defined`，看起来像缺依赖，其实不是。

## 鸿蒙

已支持，且全链路可构建——Kotlin/Native → CMake NAPI 胶水 → ArkTS → 一个包含 `libshared.so` 与 `libkuikly_entry.so` 的可安装 HAP。

它无法作为常规构建的一个 target：带 `ohosArm64` 的 KuiklyUI 产物是基于 Kotlin `2.0.21-KBA-010`（腾讯分支）发布的，所以 ohos 用一套并行构建配置：

```bash
./gradlew -c settings.ohos.gradle.kts :sample:linkSharedDebugSharedOhosArm64
```

HAP **尚未在真机或模拟器上启动过**，因此鸿蒙上关于 UI 的一切都未经验证。安装还需要模拟器镜像和已签名的包，两者都要华为开发者账号——调试 profile 必须列出目标设备的 UDID，所以必须先有模拟器。构建步骤与剩余项见 [`sample/ohosApp/README.zh-Hans.md`](https://github.com/gearui/gearui-kit/blob/main/sample/ohosApp/README.zh-Hans.md)。

DevEco Studio 26.0 自带 SDK，无需经 SDK Manager 下载。
