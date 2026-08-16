# Theming & tokens

GearUI Kit is **border-first and token-driven**. Components never carry a colour or a size of their own; they read named values from scales, and the library's CI fails any component that writes a literal instead. That is what makes a theme change re-skin every screen at once, and what keeps forty components from drifting into forty slightly different corner radii.

## Colours — `Theme.colors`

`Theme.colors` returns the active `Colors` for the current theme mode. The names are semantic (what a colour is *for*), not descriptive:

| Group | Fields |
| --- | --- |
| Surfaces | `background` `foreground` `surface` `surfaceForeground` `card` `cardForeground` `popover` `popoverForeground` `muted` `mutedForeground` |
| Brand | `primary` `primaryForeground` `secondary` `secondaryForeground` `accent` `accentForeground` |
| Status | `destructive` `success` `warning` `info` — each with a `…Foreground` |
| Structure | `border` `input` `ring` |

Every `X` has an `XForeground` that is guaranteed readable on top of it. Text on a filled `primary` button is `primaryForeground`, not "white".

```kotlin
val colors = Theme.colors           // always the first line of a component
Text(text, color = colors.mutedForeground)
Box(Modifier.background(colors.surface).border(BorderWidth.thin, colors.border))
```

### Modes and custom themes

```kotlin
App(themeMode = ThemeMode.System, isSystemDark = isSystemDark) { … }   // Light | Dark | System
App(themeMode = ThemeMode.Dark, theme = MyThemes.DarkPurple) { … }    // your own ThemeSpec
```

`ThemeSpec` is a data class over `Colors`; the built-ins are `Themes.Light` and `Themes.Dark`. The sample ships a `DarkPurple` to show the shape of a custom one. Neutral greys are truly neutral (R = G = B); the old blue-tinted zinc ramp was removed.

## The six scales

Everything measured in `dp` comes from one of these. Two of them share numbers with each other, which is exactly why they are separate types — see the note under Elevation.

### Spacing — `Spacing.*`

8px grid. Use it for padding, gaps and offsets.

| `none` | `xs` | `sm` | `md` | `lg` | `xl` | `xxl` | `xxxl` | `huge` | `massive` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 48 | 64 |

`md` (12dp) is the most-used step.

### Radius — `Theme.shapes.*` / `Radius.*`

Six steps. `Theme.shapes` gives `Shape` instances for `Modifier.clip`; `Radius` gives the same values as `Dp` for token code. They cannot disagree.

| `none` | `sm` | `md` | `lg` | `xl` | `full` |
| --- | --- | --- | --- | --- | --- |
| 0 | 4 | 6 | 8 | 12 | 9999 (pill) |

Inputs and default surfaces sit at `md`; buttons and cards at `lg`; sheets at `xl`. Off-scale values snap to the nearest step — the scale does not grow.

### Elevation — `Elevation.*`

GearUI is border-first: **things sitting flat on the page do not cast shadows.** Cards, cells and inputs separate themselves with `colors.border`. A shadow means "this floats above the page", so only overlay-like components use one.

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

`thin` is the field-family default. There is deliberately **no focus-state step**: a border that grows on focus changes the content box and makes the layout jump.

### Icon size — `IconSizes.*`

Two groups because they answer different questions. `Default` sits beside text; `Display` is an illustration.

| `Default.xs` | `.sm` | `.md` | `.lg` | `.xl` |  | `Display.sm` | `.md` | `.lg` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 12 | 14 | 16 | 18 | 24 |  | 28 | 36 | 40 |

### Typography — `Typography.*`

Semantic text styles: `DisplayLarge`… `HeadlineMedium`… `TitleSmall`… `BodyMedium` (the most used, 14sp/22sp), `MarkMedium` (bold body), `LinkMedium`, `Caption`, `Label`. Never set `fontSize` on a `Text`; pick a style.

## What the guardrails check

The repository runs 18 checks on every push. The ones that matter to a consumer, because they define what "using GearUI correctly" means:

- no `Color(0x…)` in component code
- no literal `dp` inside `RoundedCornerShape(...)`, `.border(...)`, `elevation = ...`, or icon `size = ...`
- no `Spacing.*` used as a radius or elevation
- no `fontSize =` on text
- no emoji or symbol characters used as icons (they ignore `tint` and bypass the icon pipeline)

You do not have to run these on your own app, but they are why the components look consistent, and copying the habit is cheap.
