# Platforms

| Platform | Library | Sample | CI |
| --- | --- | --- | --- |
| Android | ✅ | ✅ | ✅ |
| iOS | ✅ | ✅ | ✅ |
| Web (H5) | ✅ | ✅ | ✅ |
| HarmonyOS | ✅ | ✅ builds | — |

## Android and iOS

Both render through KuiklyUI's native renderers — real platform views, not a canvas. The published artifacts are `gearui-kit-android` (AAR) and three iOS klibs (`iosarm64`, `iossimulatorarm64`, `iosx64`); Gradle picks the right one from the root coordinate.

On iOS the sample is a CocoaPods host. One trap worth knowing before you copy it: `pod install` must run **after** a Gradle build has produced the framework, otherwise CocoaPods sees an empty resources directory and silently drops the copy phase — the app builds and runs, and every icon is a blank box. The repo has a CI check for exactly this.

## Web

The Web target runs through KuiklyUI's web renderer (`core-render-web`). The sample's `jsApp` host runs every sample page: each one loads, scrolls and resizes between a phone and a desktop width without errors, in light and dark, and fits a 320-wide screen.

The host must not carry a UMD wrapper — the sample's `webpack.config.d/output.js` disables it. Without that, kotlin-webpack's UMD tail replaces `window.com` and the render bridge disappears; the symptom is `callNative is not defined`, which looks like a missing dependency and is not.

## HarmonyOS

Supported, and builds end to end — Kotlin/Native → CMake NAPI glue → ArkTS → an installable HAP carrying both `libshared.so` and `libkuikly_entry.so`.

It cannot be a target of the normal build: the KuiklyUI artifacts carrying `ohosArm64` are published against Kotlin `2.0.21-KBA-010` (a Tencent fork), so ohos uses a parallel build configuration:

```bash
./gradlew -c settings.ohos.gradle.kts :sample:linkSharedDebugSharedOhosArm64
```

The HAP has **not been launched on a device or emulator yet**, so nothing about the UI is verified on HarmonyOS. Installing needs an emulator image and a signed package, both behind a Huawei developer account — the debug profile has to list the target's UDID, so the emulator must exist first. See [`sample/ohosApp/README.md`](https://github.com/gearui/gearui-kit/blob/main/sample/ohosApp/README.md) for the build steps and what remains.

DevEco Studio 26.0 bundles the SDK, so there is nothing to fetch through SDK Manager.
