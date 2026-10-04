# Icons

GearUI Kit ships every [Phosphor](https://phosphoricons.com) icon, regular and fill, as typed Kotlin properties.

```kotlin
import com.gearui.components.icon.*

Icon(Icons.xCircle)
Icon(Icons.heart, fill = liked, tint = Theme.colors.destructive)
Icon(Icons.house, size = IconSizes.Display.lg)
```

| Parameter | Default | Meaning |
| --- | --- | --- |
| `icon` | — | An `IconSource`: `Icons.*`, or a set of your own |
| `size` | `IconSizes.Default.lg` | A step of the icon scale (see [Theming](./theming)) |
| `tint` | `Theme.colors.foreground` | Follows light and dark without a colour at every call; `Color.Unspecified` keeps an image's own colours |
| `fill` | `false` | The icon's fill form; an icon without one keeps its regular form |

The import is needed, as with Compose's Material icons: each icon is an extension property on `Icons`.

## In component parameters

Components take an `IconSource` wherever they show an icon. A parameter has no `fill` switch, so ask for the fill form with `.filled`:

```kotlin
Button(text = "Like", icon = Icons.heart, onClick = { … })
BottomNavItem(id = "home", label = "Home", icon = Icons.house, selectedIcon = Icons.house.filled)
```

## How the icons are built

The icons are path data, generated from Phosphor's SVGs and drawn by GearUI on a canvas, so they are sharp at any size and need no image files, fonts or copy steps in the app.

Only the icons your code names end up in the app. There is no lookup by string, so the compiler can leave out every icon that is not referenced:

| Platform | Unused icons removed |
| --- | --- |
| iOS, HarmonyOS | Always (Kotlin/Native) |
| Web | Always (Kotlin/JS) |
| Android | When R8 runs (`isMinifyEnabled = true`); without it the full set is about 2 MB of code |

## Your own icons

Any object whose members return an `IconSource` is an icon set and works everywhere a built-in icon does. Use `VectorIcon` for path data and `ImageIcon` for images your app ships:

```kotlin
object AppIcons {
    val logo: IconSource
        get() = ImageIcon("logo", "assets://icons/logo.png", fill = "assets://icons/logo_fill.png")
    val spark: IconSource
        get() = VectorIcon("spark", "M128 16L…Z", fill = "M…Z")
}

Icon(AppIcons.logo, tint = Color.Unspecified)
Icon(AppIcons.spark, fill = selected)
```

Declare icons as getters (`get() =`), not stored properties: an object initialises its stored properties together, so one icon used would keep the whole set in the app.

`VectorIcon` takes absolute `M`, `L`, `Q`, `C` and `Z` commands in a 256-unit square (pass `viewport` for another size). The kit's `scripts/gen_vector_icons.py` writes them from SVG files and can generate a whole set with `--receiver` and `--package`.

## Upgrading from beta7

Up to beta7, icons were PNG assets and `Icons.*` were their names as strings.

| beta7 | beta8 |
| --- | --- |
| `Icon(Icons.x_circle)` or `Icon("x_circle")` | `Icon(Icons.xCircle)` |
| `icon = Icons.star` (a `String`) | `icon = Icons.star` (an `IconSource`) |
| `Icon(Icons.star_fill)` | `Icon(Icons.star, fill = true)` |
| `tint = null` meant the image's own colours | `tint` defaults to the foreground; pass `Color.Unspecified` for an image's own colours |
| Gradle tasks copying the kit's PNGs into the app | Remove them |
| An app PNG by name | `ImageIcon("name", "assets://icons/name.png")` |
