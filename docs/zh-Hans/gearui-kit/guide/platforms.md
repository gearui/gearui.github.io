# 平台支持

| 平台 | 库 | Sample | CI |
| --- | --- | --- | --- |
| Android | ✅ | ✅ | ✅ |
| iOS | ✅ | ✅ | ✅ |
| Web (H5) | ✅ | ✅ 76 个演示中 75 个 | ✅ |
| 鸿蒙 | ⚠️ 脚手架 | ⚠️ 脚手架 | — |

## Android 与 iOS

两者都通过 KuiklyUI 的原生渲染器渲染——是真正的平台视图，不是画布。发布产物是 `gearui-kit-android`（AAR）和三个 iOS klib（`iosarm64` / `iossimulatorarm64` / `iosx64`）；Gradle 从根坐标自动挑。

iOS 的 sample 是 CocoaPods 宿主。照抄之前有个坑要知道：`pod install` 必须在 Gradle 构建出 framework **之后**跑，否则 CocoaPods 看到的是空资源目录，会静默删掉拷贝阶段——App 照常构建、照常运行，只是所有图标都是空白方块。仓库里有一条 CI 检查专门盯这个。

## Web

Web 目标通过 KuiklyUI 的 web 渲染器（`core-render-web`）运行。sample 的 `jsApp` 宿主可用，76 个演示中 75 个正常渲染与交互；失败的那个是 `Table`，报的是 Kotlin/JS 部分链接错误，出在 sample 自身的演示文件而不是组件本身。根因尚未查实。

宿主不能带 UMD wrapper——sample 的 `webpack.config.d/output.js` 把它关掉了。不关的话 kotlin-webpack 的 UMD 尾部会整体替换 `window.com`，渲染桥就没了；症状是 `callNative is not defined`，看起来像缺依赖，其实不是。

## 鸿蒙

只有脚手架，从未构建。它无法作为常规构建的一个 target：带 `ohosArm64` 的 KuiklyUI 产物是基于 Kotlin `2.0.21-KBA-010`（腾讯分支）发布的，所以 ohos 用一套并行构建配置，以 `-c settings.ohos.gradle.kts` 选择。哪些验证过、哪些没有，见 [`sample/ohosApp/README.md`](https://github.com/gearui/gearui-kit/blob/main/sample/ohosApp/README.zh-Hans.md)。
