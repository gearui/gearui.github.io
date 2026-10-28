# Platforms

| Platform | Minimum | Verified at | Not accepted yet |
| --- | --- | --- | --- |
| Android | minSdk 21 (compileSdk 36) | Interaction on a device (Xiaomi 12 Pro, Android 16); unit tests and lint in CI | A low-end device's performance |
| iOS | 15.0 | Interaction on the simulator (iOS 18.2 and 27.0); Kotlin tests on the simulator in CI | A physical-device pass of the kit itself |
| Web (H5) | Chromium-based browsers | Every sample page loads, scrolls and resizes in both themes (Playwright, Chromium) | Keyboard operation and focus order; Safari/WebKit |
| HarmonyOS | — | Builds end to end (kit, NAPI glue, HAP) | Running on a device or emulator |

Toolchain: Kotlin **2.1.21** (must equal KuiklyUI's), KuiklyUI **2.30.0**, Compose Multiplatform **1.7.3**.

**Limited support — stated the same everywhere:**

- **Right-to-left languages are not supported.** KuiklyUI does not pass the layout direction through.
- **iOS Dynamic Type is not followed.** KuiklyUI turns font scaling off on iOS; Android's font scale is followed.
- **HarmonyOS is build-level only.** Nothing about its UI is verified until it runs on a device.
- **Blur is off by default** until four renderer gaps are fixed upstream (see `docs/VISUAL_SPEC.md` §5).
- The Android system keyboard follows the system's light or dark setting, not the app's — the platform offers no way to set it.

**Touch targets are 44 × 44 on every platform.** This follows Apple's rule and is a deliberate
choice: Android's guideline is 48 dp. Controls never overlap their neighbours' targets.

## Android and iOS

Both render through KuiklyUI's native renderers — real platform views, not a canvas. The published artifacts are `gearui-kit-android` (AAR) and three iOS klibs (`iosarm64`, `iossimulatorarm64`, `iosx64`); Gradle picks the right one from the root coordinate.

On iOS the sample is a CocoaPods host. One trap worth knowing before you copy it: `pod install` must run **after** a Gradle build has produced the framework, otherwise CocoaPods sees an empty resources directory and silently drops the copy phase — the app builds and runs, and every image of the app's own is missing. The repo has a CI check for exactly this. GearUI's icons are code and do not depend on it.

A second: set `CADisableMinimumFrameDurationOnPhone` to `YES` in the host's `Info.plist`, as the sample does. Without it an iPhone holds the app's own animations to 60 Hz on a 120 Hz ProMotion screen, while system scrolling runs at 120 Hz, so every animation GearUI drives — a page sliding in, a sheet, a switch — looks stepped next to the scrolling around it. Nothing else changes: an app with nothing moving still draws no extra frames.

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
