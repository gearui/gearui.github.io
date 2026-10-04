---
title: Compared with Flutter and React Native
titleTemplate: GearUI Kit
---

# Compared with Flutter and React Native

Nobody has heard of GearUI Kit. Everybody has shipped with Flutter or React Native. So this page puts GearUI Kit beside the two things you already know, and says where it is ahead, where it is behind, and why.

Two rules for reading it. First, it compares **like with like**: Flutter is a language, an engine and a widget set; React Native is a language, a bridge and a component set; GearUI Kit is Kotlin, a native-view renderer (KuiklyUI) and a component library. Comparing the component library alone would be dishonest in the other direction. Second, GearUI Kit has **two layers with two owners**, and every claim below says which one it belongs to. What KuiklyUI does is Tencent's work and Tencent's measurement; what GearUI Kit adds on top is ours, and is only claimed where we have measured it.

## The short version

| | GearUI Kit | Flutter | React Native |
|---|---|---|---|
| Rendering | ✅ Real native views, everywhere | Its own engine, canvas everywhere | Real native views |
| Native controls — IME, autofill, accessibility, text selection | ✅ The system's own | Reimplemented; a native view must be *embedded* | The system's own |
| Follows OS design updates (iOS 26) | ✅ The day the OS ships | Waits for the framework to repaint | The day the OS ships |
| Performance | ✅ First screen 122 ms vs native 125 ms · SDK 300 KB / 1.2 MB ¹ | Engine, MB-scale | JS engine + bundle |
| Platform debugging tools | ✅ Every view visible and attributable; on Android, the native ceiling | Opaque FlutterView; DevTools only | Visible; two stacks to correlate |
| Language | Kotlin, shared with the Android team and a JVM backend | Dart | JS / TS |
| Default look | ✅ An iOS-led design system on every platform, 71 components | Material; Cupertino is second-class | None |
| Design consistency | ✅ Tokens enforced by 22 CI checks | Themeable, not enforced | None |
| HarmonyOS | ✅ First-class target | Community fork | Huawei-maintained fork |
| Ecosystem and maturity | Small · beta8 (KuiklyUI runs Tencent products at 500 M DAU) | **Large · since 2017** | **Very large · since 2015** |

¹ Tencent's own measurement on HarmonyOS, Huawei Mate 60, complex feed scenario — [source](https://news.qq.com/rain/a/20250603A05YV000).

The last row is bold on purpose. If you do not believe we would concede it, you have no reason to believe the rows above it.

## Native views: the root of most of the difference

KuiklyUI maps every Compose node to a real platform view — `UIView` on iOS, `android.view.View` on Android, ArkUI on HarmonyOS, DOM on the Web ([architecture](https://kuikly.tds.qq.com/Introduction/arch.html)). Flutter paints its widgets onto its own canvas with its own engine. React Native renders native views, and shares this advantage.

Most of the rows above are consequences of that one fact.

**"Flutter doesn't do native controls" is the wrong way to say it, and the right way is stronger.** Flutter *can* host a native view — `AndroidView`, `UiKitView` — but each one is an exception with a price: hybrid composition or texture mode, each with its own trade-offs; z-order, clipping, gesture arbitration, keyboard and threading all need handling; and WebViews, maps, video and ad slots are where Flutter apps have accumulated bugs for years. Flutter documents the costs itself ([Android](https://docs.flutter.dev/platform-integration/android/platform-views), [iOS](https://docs.flutter.dev/platform-integration/ios/platform-views)). GearUI Kit has no concept of *embedding* a native view. Every view already is one.

### What that buys — KuiklyUI's layer

| Pain point | Flutter | React Native | GearUI Kit |
|---|---|---|---|
| Native views | Canvas; native views are embedded, each a special case | Native | All native, nothing to embed |
| Text input — CJK composition, autofill, password managers, the system's selection handles and long-press menu | Its own `EditableText`; Chinese IME composition has been a chronic source of bugs | Native | Native `UITextField` / `EditText` |
| Accessibility — VoiceOver, TalkBack | Its own semantics tree, bridged | Native | Native |
| Scroll physics and system effects — iOS bounce, Android 12 stretch, tap-status-bar-to-top | Imitated one by one | Native | Native |
| Following the OS design language — iOS 26 Liquid Glass, Dynamic Type, dark materials | Waits for the framework to repaint it | Automatic | **Arrives with the OS update** |
| Platform debugging tools | FlutterView is a black box; DevTools only | Visible | Xcode View Debugger, Layout Inspector and Perfetto see the real views |
| SDK size | Its own engine, MB-scale | JS engine + bundle | Android ~300 KB (AOT) · iOS ~1.2 MB |
| Incremental adoption inside an existing native app | Whole app, or a Flutter module | Embeddable | Page by page — this is how Tencent uses it: 20+ products, 1,000+ pages, 500 M DAU |
| HarmonyOS | Community fork | Huawei-maintained fork | First-class target |

The "follows the OS" row deserves its own sentence. iOS 26 just shipped. Apps on canvas stacks still look like last year until their framework repaints; apps on native views did nothing and got it.

## What GearUI Kit adds on top

KuiklyUI is a renderer. It does not ship a component library that looks like a finished product on day one, a design system that stays consistent once ten people are committing, or the runtime plumbing every app otherwise re-solves. That layer is ours.

### Components and design system

| Pain point | Flutter / React Native | GearUI Kit |
|---|---|---|
| Looks like iOS by default | Flutter defaults to Material and its Cupertino set is a painted, incomplete imitation; React Native ships nothing | GearUI Kit's own token scales as the floor, iOS 26 for platform-signature controls (switch, list rows, grouped cards, separators — measured on the simulator), one design language on every platform, 71 components. Every control value records which reference it follows and why — [the rule](https://github.com/gearui/gearui-kit/blob/main/docs/VISUAL_SPEC.md#2-where-values-come-from), [the per-token table](https://github.com/gearui/gearui-kit/blob/main/docs/COMPONENT_METRICS.md) |
| Still looks like one product after ten people have committed for six months | Discipline | Six token scales, **20 guard scripts** and a provenance check: literals are rejected in component code, a radius can only come from the scale — [the guards](https://github.com/gearui/gearui-kit/tree/main/scripts/ci) |
| Icons | Font glyphs, or each app imports its own | Every Phosphor icon, regular and fill, as typed vectors; only the icons the code names are shipped |
| Platform effects such as frosted glass | Each app on its own | A material layer with a **degradation rule**: where blur cannot run, the surface goes opaque rather than leaving a translucent wash over arbitrary content. We also [document where the renderer's blur falls short](https://github.com/gearui/gearui-kit/blob/main/docs/VISUAL_SPEC.md#5-shadows-borders-and-materials) — publishing our own dependency's gaps is part of being believed |

### Runtime plumbing

Every row here is a bug we hit and fixed, not a feature we imagined.

| Pain point | GearUI Kit |
|---|---|
| A dialog or sheet gets clipped by the scrolling list it was opened from | The overlay host sits above the page and escapes any clip |
| The page underneath an open sheet still scrolls | An overlay freezes the page beneath it; pass-through banners are exempt |
| Safe-area insets are not reactive in the renderer, and the keyboard's height leaks into the bottom inset | A stabilised safe-area pipeline |
| Tap-outside-to-dismiss the keyboard also fires on buttons and on the input itself | Input regions declare themselves exempt; nothing is inferred from "was the event consumed" |
| Language packs grow past Android's DEX method limit | i18n split by domain; downstream libraries plug into the same pipeline |
| Wiring it all | One `App` root: theme, i18n, overlays, safe area, keyboard |

### Navigation and gestures

| Pain point | GearUI Kit |
|---|---|
| Switching tabs destroys and rebuilds the whole subtree | TabHost keep-alive — janky frames **40.4 % → 4.0 %**, measured with `gfxinfo` on a 1440×3200 device |
| Swipe back | Full-screen, the way WeChat does it; not dependent on the system's edge zone |
| Android 16's predictive back silently disconnects the legacy callback | Handled |
| "Discard changes?" before leaving a page | A route-level pending state; BACK ownership is explicit |
| String-typed routes | Typed routes |
| A sheet can only be closed by Cancel | Grabber and drag-to-dismiss, tracking the finger 1:1 |

## Debugging and tooling

Three things GearUI Kit can do that Flutter structurally cannot, and one honest limit.

**On Android it is the native Android ceiling, undiscounted.** Kotlin in Android Studio: breakpoints, stepping, expression evaluation, the Profiler, Perfetto, the Database Inspector, Logcat. Layout Inspector shows real Android views, because that is what KuiklyUI renders. This is not "close to the native experience". It *is* the native experience.

**Platform tools see every view.** In Xcode's View Debugger and Instruments, in Android's Layout Inspector and Perfetto, every GearUI component is a named, selectable, measurable real view. Flutter is one opaque `FlutterView` in all of them; performance work has to go through DevTools, and the moment a problem sits on the native boundary — a platform view, the IME, a crash — you are between two toolchains.

**One language, one debugger, one call stack.** The app logic lives in shared Kotlin and breaks at the same breakpoint on both platforms. There is no Dart↔native or JS↔native seam; correlating a JS stack with a native one is a React Native rite of passage.

**The limit.** Kotlin/Native debugging on iOS goes through the Kotlin LLDB plugin in Xcode or JetBrains' iOS debugging support in its IDEs. It works and it is improving; it is not the Android ceiling. Dart debugs the same on both platforms, and Flutter's hot reload is the best in the field. We are not claiming otherwise.

| Tooling | GearUI Kit | Flutter | React Native |
|---|---|---|---|
| Android debugging | Android Studio, the native ceiling | Dart debugger + DevTools | RN DevTools for JS, Android Studio for native |
| iOS debugging | Xcode + Kotlin LLDB plugin — works, not the ceiling | Dart debugger, same on both platforms | JS + Xcode, two toolchains |
| View inspector (View Debugger / Layout Inspector) | **Every real view** | Opaque FlutterView | Visible |
| Platform profilers (Instruments / Perfetto) attribute to a component | **Yes** | No; DevTools only | Partly |
| Cross-platform call stack | One Kotlin stack | Dart + native | JS + native, hard to correlate |
| Hot reload | Not verified here, so not claimed | **Best in the field** | Fast Refresh |
| Framework's own tooling | KuiklyUI ships an Android Studio plugin (Tencent reports a 40× faster variable inspection, HarmonyOS scenario) | DevTools, and it is very good | RN DevTools |

## Performance

GearUI Kit's position is simple: **the renderer measures within a few milliseconds of native, and everyone already knows where Flutter and React Native sit relative to native.** So the table cites Tencent's measurement for the renderer, states the mechanism for the others, and does not invent numbers we have not run.

| Metric | GearUI Kit (KuiklyUI, measured by Tencent ¹) | Flutter | React Native |
|---|---|---|---|
| Minimum SDK size | Android ~300 KB (AOT) · iOS ~1.2 MB | Ships a rendering engine; MB-scale | JS engine + bundle |
| First screen | 122 ms vs native 125 ms | Engine initialises, then paints | JS bundle loads, then renders |
| Page open vs React Native | 6× faster — against RN's **HarmonyOS** port | — | Baseline |
| Animation frame rate | 58–60 fps | **Impeller also holds 60** | Depends on JS-thread load |
| Memory | +12 MB over a 100-frame animation; near-zero resident overhead | Engine resident | JS engine resident |
| System integration | Native views: accessibility, IME, text selection for free | All reimplemented | Native views, for free |

¹ Tencent's HarmonyOS measurement, Huawei Mate 60, complex feed scenario ([official article](https://news.qq.com/rain/a/20250603A05YV000); the millisecond, fps and memory figures are read from its charts). SDK sizes from the [KuiklyUI README](https://github.com/Tencent-TDS/KuiklyUI).

Two things this table is careful about. The 6× is against React Native's HarmonyOS port, which is younger than the React Native you know on iOS and Android; dropping that qualifier would be misleading. And the frame-rate row does not say Flutter drops frames — Impeller is genuinely fast. Flutter's costs are startup, size, memory and system integration, not 60 fps.

**These are KuiklyUI's numbers, not GearUI Kit's.** Our layer is not free, so we measure it ourselves, on the kit's own components, with the sample's Performance page and the scripts in [`scripts/perf/`](https://github.com/gearui/gearui-kit/tree/main/scripts/perf). Android: Xiaomi 12 Pro, Android 16, 120 Hz, a release (non-debuggable) build, 2026-09-28.

| GearUI Kit measure | Result | Budget |
|---|---|---|
| Cold start to the home component list drawn (process start → first frame), 5 runs | median **310 ms** | ≤ 1200 ms |
| Theme switch, the whole app, ~200 components on screen, 20 flips | median **36.9 ms**, p90 44.5 | ≤ 120 ms |
| 1000-row `List` of real `Cell`s flung for 5 s (`dumpsys gfxinfo`) | janky **0.20 %**, p99 11 ms | < 3 % |
| Tab switching under TabHost keep-alive (`gfxinfo`, 1440×3200) | janky **4.0 %**, down from 40.4 % before the fix | — |

iOS so far has simulator numbers only — theme switch 36.8 ms, scroll 0.0 % janky; cold start reads 1030 ms, but 764 ms of it is before the Kotlin page exists, so it waits for a device pass before it counts. A debuggable build is about five times slower to start; never judge the kit by one. [Method and raw results](https://github.com/gearui/gearui-kit/blob/main/docs/QUALITY_STATUS.md).

## Where Flutter and React Native are ahead

- **Ecosystem.** pub.dev and npm are one to two orders of magnitude larger than the libraries GearUI Kit can draw on.
- **Maturity and track record.** Flutter since 2017, React Native since 2015. KuiklyUI was open-sourced in 2025 — with a real production history inside Tencent, but a short public one. GearUI Kit is at beta8.
- **Hiring, tutorials, answered questions.** Not close.
- **Hot reload.** Flutter's is the best there is.
- **Pixel-identical UI across platforms.** Flutter's canvas gives it; native views do not. For a design-led app that wants the same pixels on every phone, that is a feature, and it is Flutter's.
- **Desktop.** Flutter has it. GearUI Kit does not.

## When to pick which

**GearUI Kit** when the app must feel native on iOS and Android at once, the team writes Kotlin or shares one with an Android team, HarmonyOS is on the roadmap, or you need to embed cross-platform pages into an existing native app one at a time.

**Flutter** when pixel-identical UI matters more than platform feel, the team is already fluent in Dart, or you are starting fresh and want the largest cross-platform ecosystem and the best hot reload.

**React Native** when the team is a web team, the JS ecosystem is the point, and native views with a JS logic layer is an acceptable trade.

## Sources

- [KuiklyUI — GitHub README](https://github.com/Tencent-TDS/KuiklyUI) — SDK sizes, native binaries
- [KuiklyUI — architecture](https://kuikly.tds.qq.com/Introduction/arch.html)
- [Tencent: Kuikly HarmonyOS release — performance](https://news.qq.com/rain/a/20250603A05YV000) — 6× vs RN, first screen, charts
- [Flutter — Platform views on Android](https://docs.flutter.dev/platform-integration/android/platform-views) · [on iOS](https://docs.flutter.dev/platform-integration/ios/platform-views)
- [GearUI Kit — visual specification](https://github.com/gearui/gearui-kit/blob/main/docs/VISUAL_SPEC.md) · [design system](https://github.com/gearui/gearui-kit/blob/main/docs/DESIGN_SYSTEM.md)
- [GearUI Kit — CI guards](https://github.com/gearui/gearui-kit/tree/main/scripts/ci)
- [GearUI Kit — where KuiklyUI's blur falls short](https://github.com/gearui/gearui-kit/blob/main/docs/VISUAL_SPEC.md#5-shadows-borders-and-materials)
- [GearUI Kit — component metrics: every control value and the reference it follows](https://github.com/gearui/gearui-kit/blob/main/docs/COMPONENT_METRICS.md)
- [GearUI Kit — quality status and performance measurements](https://github.com/gearui/gearui-kit/blob/main/docs/QUALITY_STATUS.md)
