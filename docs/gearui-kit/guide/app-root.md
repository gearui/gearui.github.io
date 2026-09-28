# App root & runtime

`App` is the one composable every GearUI Kit tree starts with. It is not a theme wrapper; it is the runtime. In one call it mounts:

```
App(themeMode, languageTag, runtimeFlags, …)
 └── I18nRoot            LocalLanguageTag / LocalFallbackLanguageTag
      └── I18nProvider   the kit's own strings
           └── Theme     Theme.colors / shapes / typography
                └── ProvideRuntimeEnvironment   stabilised safe area, keyboard inset, flags
                     └── OverlayRoot            host for Dialog / BottomSheet / Popover / Toast / …
                          └── your content
```

## Signature

```kotlin
@Composable
fun App(
    themeMode: ThemeMode = ThemeMode.Light,      // Light | Dark | System
    isSystemDark: Boolean = false,               // read from your platform layer
    theme: ThemeSpec? = null,                    // custom palette; overrides themeMode's default
    typography: Typography = Typographies.Default,   // other token axes; each independent
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

## One root, not two

There must be exactly one `App` in the composition. A second one lower down would re-provide `RuntimeFlags` and the overlay host and silently change behaviour for everything beneath it. `View` already wraps `App` for you (see [Getting started](/gearui-kit/guide/getting-started#mount-the-root)); if you call `App` yourself, set `autoWrapApp = false` on the `View`.

## Safe area

Page chrome consumes safe area through `PageScaffold` — that is the one correct place. It reads a **stabilised** inset, not the raw one:

- Kuikly on iOS may report a top inset of 0 for a frame while the scene is not yet active. That transient 0 is filtered; any non-zero change (in-call status bar, split screen) is accepted immediately.
- The bottom inset ignores the keyboard. IME height is delivered separately as `keyboard` and never leaks into page padding.

Components never read `safeAreaInsets` themselves. `NavBar`, `BottomNavBar`, `Drawer`, `ActionSheet` and `BottomSheet` all resolve their edge through `rememberSafeAreaInset(edge)`, whose behaviour is switched per component by `RuntimeFlags`:

```kotlin
RuntimeFlags(
    navBarConsumesTopSafeArea = false,          // PageScaffold does it
    bottomNavBarConsumesBottomSafeArea = true,
    drawerConsumesVerticalSafeArea = true,
    actionSheetConsumesBottomSafeArea = true,
    bottomSheetConsumesBottomSafeArea = true,
)
```

Set these once on `App`; do not add per-page overrides.

## Overlays

Everything that floats — `Dialog`, `ConfirmDialog`, `BottomSheet`, `ActionSheet`, `Popover`, `Tooltip`, `ContextMenu`, `Toast`, `Snackbar`, `Notification`, `Tour` — is rendered by the `OverlayRoot` that `App` mounts. That gives them a single dismissal policy (tap outside, scroll, back key, route change) declared per overlay and enforced in one place, and it is why a `Select` dropdown can escape a clipped list.

Two behaviours worth knowing:

- **Overlays dismiss on scroll.** `GearLazyColumn` (and anything using `OverlayManager.notifyScroll`) tells the host when the user drags, so an open dropdown does not float away from its trigger.
- **Non-modal banners pass gestures through.** `Snackbar` and `Notification` set `passThroughOutside = true`; while a banner is up the rest of the screen stays tappable and scrollable. Without that a fullscreen overlay would freeze the app for as long as a notification is visible.

## Keyboard

`keyboardDismissMode` defaults to `OnTapOrScroll`: tapping empty space or scrolling hides the IME. `Input` and `Textarea` handle focus in a way that survives Kuikly's tendency to recreate the native `EditText` when the modifier chain changes — which is also why an input's border colour must not depend on focus. That is a documented constraint of the field family, not a style choice.
