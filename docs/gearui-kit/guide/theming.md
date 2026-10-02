# Theming & tokens

GearUI Kit is **token-driven: its own scales are the floor, and iOS rules where the platform decides**. Components never carry a colour or a size of their own; they read named values from scales, and the library's CI fails any component that writes a literal instead. That is what makes a theme change re-skin every screen at once, and what keeps forty components from drifting into forty slightly different corner radii.

## Where the values come from

Every control value follows one written rule:

- **Platform-signature controls and list rhythm** — switch, list row height, grouped cards, separators — the current iOS release, measured on the simulator rather than remembered (iOS 26.2 today: a 63×28 switch, 52pt rows, 20pt card inset).
- **Everything else** — inside a control (button, field, tabs, menu, dialog card, popover) and the radius scale — GearUI Kit's own scales, with the reason written down.

Each control token carries that decision in its source: the value, where it comes from and why. CI rejects a token whose value drifts from its source, and a new token without one. The full table is [COMPONENT_METRICS.md](https://github.com/gearui/gearui-kit/blob/main/docs/COMPONENT_METRICS.md); the rule itself is [VISUAL_SPEC.md §2](https://github.com/gearui/gearui-kit/blob/main/docs/VISUAL_SPEC.md#2-where-values-come-from).

## Colours — `Theme.colors`

`Theme.colors` returns the active `Colors` for the current theme mode. The names are semantic (what a colour is *for*), not descriptive:

| Group | Fields |
| --- | --- |
| Surfaces | `background` `foreground` `surface` `surfaceForeground` `card` `cardForeground` `popover` `popoverForeground` `muted` `mutedForeground` |
| Brand | `primary` `primaryForeground` `secondary` `secondaryForeground` `accent` `accentForeground` |
| Status | `destructive` `success` `warning` `info` — each with a `…Foreground` |
| Soft status | `primarySoft` `successSoft` `warningSoft` `destructiveSoft` — tinted fills, each with a `…Foreground` |
| Structure | `border` `input` `ring` `separator` `separatorSecondary` `segment` |

Every `X` has an `XForeground` that is guaranteed readable on top of it. Text on a filled `primary` button is `primaryForeground`, not "white".

```kotlin
val colors = Theme.colors           // always the first line of a component
Text(text, color = colors.mutedForeground)
Box(Modifier.background(colors.surface).border(BorderWidth.hairline, colors.separator))
```

### Modes and custom themes

```kotlin
App(themeMode = ThemeMode.System, isSystemDark = isSystemDark) { … }   // Light | Dark | System
App(themeMode = ThemeMode.Dark, theme = MyThemes.DarkPurple) { … }    // your own ThemeSpec
```

`ThemeSpec` is a data class over `Colors`; the built-ins are `Themes.Light` and `Themes.Dark`. The sample ships a `DarkPurple` to show the shape of a custom one. Neutral greys are truly neutral (R = G = B).

### Independent axes

Brand accent, shape, typography, elevation, motion and light/dark are separate axes, all passed to `App`. Changing one never resets another:

```kotlin
App(
    themeMode = ThemeMode.System,
    isSystemDark = isSystemDark,
    theme = Themes.Light.withBrandAccent(Color(0xFF7C3AED)),   // brand colour only
    shapes = myShapes,                                        // rounded or square preset
    typography = myTypography,
) { … }
```

`withBrandAccent` replaces `primary`, its foreground, the soft `primarySoft` pair and the focus ring, and leaves surfaces, shapes and type alone.

## The six scales

Everything measured in `dp` comes from one of these. Two of them share numbers with each other, which is exactly why they are separate types — see the note under Elevation.

### Spacing — `Spacing.*`

8px grid. Use it for padding, gaps and offsets.

| `none` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` | `xxxl` | `huge` | `massive` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 |

`md` (12dp) is the most-used step.

### Radius — `Theme.shapes.*`

GearUI Kit's own scale. `Theme.shapes` gives `Shape` instances for `Modifier.clip`, and because it is a theme axis a brand can swap it for a square preset without touching components.

| `none` | `sm` | `md` | `lg` | `controlLarge` | `xl` | `full` |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 8 | 12 | 14 | 16 | 24 | 9999 (pill) |

Small controls and chips sit at `sm`; fields at `md`; buttons and cards at `lg`; large controls at `controlLarge`; dialogs and overlay surfaces at `xl`. Buttons and tabs that are meant to be capsules use `full`.

`Radius.*` gives the same steps as `Dp` for code that needs a number rather than a `Shape`; both are read from the same generated geometry.

### Elevation — `Elevation.*`

Surfaces are flat and content-first: depth comes from tokenised shadows and separators, not chrome. Fields are borderless with a soft field shadow (on a card or sheet, pass `variant = FieldVariant.SECONDARY` for the filled look; every field-family component takes it); grouped lists separate rows with `separator` lines that start at the text, the way iOS does. A strong shadow means "this floats above the page", so only overlays use the steps below.

| `none` | `raised` | `floating` | `modal` |
| --- | --- | --- | --- |
| 0 | 4 | 6 | 8 |

`raised` = controls attached to content and light anchored overlays (Popover, Snackbar). `floating` = detached panels (Select dropdown, Notification). `modal` = layers that take focus (Dialog).

::: warning Do not use `Spacing.*` as an elevation
`Spacing.xs` and `Elevation.raised` are both 4dp today. They are different axes; writing `Spacing.xs` where a shadow depth is expected compiles and looks right, and breaks the day the spacing scale is retuned. The CI guard rejects it for that reason.
:::

### Border width — `BorderWidth.*`

| `none` | `hairline` | `thin` | `thick` |
| --- | --- | --- | --- |
| 0 | 0.5 | 1 | 2 |

`hairline` outlines bordered surfaces such as `Card`. There is deliberately **no focus-state step**: a border that grows on focus changes the content box and makes the layout jump.

### Icon size — `IconSizes.*`

Two groups because they answer different questions. `Default` sits beside text; `Display` is an illustration.

| `Default.xs` | `.sm` | `.md` | `.lg` | `.xl` |  | `Display.sm` | `.md` | `.lg` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 14 | 16 | 18 | 24 |  | 28 | 36 | 40 |

### Typography — `Theme.typography.*`

Semantic text styles: `displayLarge`… `headlineMedium`… `titleSmall`… `bodyMedium` (the most used: 17/22 on Android and iOS, the iOS body size; 15/23 on the Web), `markMedium` (bold body), `linkMedium`, `caption`, `label`. Never set `fontSize` on a `Text`; pick a style.

## What the guardrails check

The repository runs 20 guard scripts on every push, plus two checks that the generated tokens and the component metrics are current. The ones that matter to a consumer, because they define what "using GearUI correctly" means:

- no `Color(0x…)` in component code
- no literal `dp` inside `RoundedCornerShape(...)`, `.border(...)`, `elevation = ...`, or icon `size = ...`
- no `Spacing.*` used as a radius or elevation
- no `fontSize =` on text
- no emoji or symbol characters used as icons (they ignore `tint` and bypass the icon pipeline)

You do not have to run these on your own app, but they are why the components look consistent, and copying the habit is cheap.
