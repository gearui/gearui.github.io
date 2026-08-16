# Platforms

| Platform | Library | Sample | CI |
| --- | --- | --- | --- |
| Android | ✅ | ✅ | ✅ |
| iOS | ✅ | ✅ | ✅ |
| Web (H5) | ✅ | ✅ 75 of 76 demos | ✅ |
| HarmonyOS | ⚠️ scaffolding | ⚠️ scaffolding | — |

## Android and iOS

Both render through KuiklyUI's native renderers — real platform views, not a canvas. The published artifacts are `gearui-kit-android` (AAR) and three iOS klibs (`iosarm64`, `iossimulatorarm64`, `iosx64`); Gradle picks the right one from the root coordinate.

On iOS the sample is a CocoaPods host. One trap worth knowing before you copy it: `pod install` must run **after** a Gradle build has produced the framework, otherwise CocoaPods sees an empty resources directory and silently drops the copy phase — the app builds and runs, and every icon is a blank box. The repo has a CI check for exactly this.

## Web

The Web target runs through KuiklyUI's web renderer (`core-render-web`). The sample's `jsApp` host works and 75 of 76 demos render and respond; the one that fails is `Table`, on a Kotlin/JS partial-linkage error in the sample's own demo file rather than in the component. Root cause is open.

The host must not carry a UMD wrapper — the sample's `webpack.config.d/output.js` disables it. Without that, kotlin-webpack's UMD tail replaces `window.com` and the render bridge disappears; the symptom is `callNative is not defined`, which looks like a missing dependency and is not.

## HarmonyOS

Scaffolded, never built. It cannot be a target of the normal build: the KuiklyUI artifacts carrying `ohosArm64` are published against Kotlin `2.0.21-KBA-010` (a Tencent fork), so ohos uses a parallel build configuration selected with `-c settings.ohos.gradle.kts`. See [`sample/ohosApp/README.md`](https://github.com/gearui/gearui-kit/blob/main/sample/ohosApp/README.md) for what is and is not verified.
