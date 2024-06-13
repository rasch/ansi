# ANSI

[ANSI escape sequences][1] for CLI pizzazz!

```javascript
import { ansi, apply, color, style } from "@rasch/ansi"

process.stdout.write(ansi("{red}{bold}Error{/bold}{/red}: whoooops!\n"))
process.stdout.write(apply(["green", "italic"], "Hello, world!\n"))
process.stdout.write(color.set("#bada55", "#c55") + " hex yeah! \n" + style.reset)
```

Check out the demo directory for more examples!

```bash
node demo/table.js
node demo/boxes.js
```

Note: This library does not write to stdout or perform any IO. It only provides
the atoms to build user interfaces for terminal applications or to create ANSI
art. All of the returned values are just strings containing ANSI escape
sequences. These are just syntactic helpers to keep code free of messy escape
strings. To build real applications or UI components with this library, the
[Node.js tty module][2] will probably be of great use. Specifically,
`process.stdout.columns`, `process.stdout.rows` and
`process.stdout.on("resize", callback)` are useful for checking the terminal
window's size while `process.stdout.getColorDepth()` and
`process.stdout.hasColors([count])` can be used for checking color support.
Keep in mind that the color support checking methods can produce incorrect
results and it may be wise to provide options for users to set the color depth.

## Installation

```sh
pnpm add @rasch/ansi
```

<details><summary>npm</summary><p>

```sh
npm install @rasch/ansi
```

</p></details>
<details><summary>yarn</summary><p>

```sh
yarn add @rasch/ansi
```

</p></details>

## API

### ansi :: String -> String

```javascript
import { ansi } from "@rasch/ansi"
```

The `ansi` function accepts a string argument. The string should contain any of
the supported ANSI tags. An ANSI tag is similar to HTML tags except the ANSI tag
is actually just stylistic rather than semantic. ANSI tags contain any of the
`color` or `style` strings wrapped in curly braces, such as `{red}` or `{bold}`.
Most tags also have a corresponding closing tag, `{/red}` or `{/bold}`. The
`{reset}` tag is automatically inserted at the end of the string parameter.

Supported tags include:

- **Foreground Colors**: `black`, `red`, `green`, `yellow`, `blue`, `magenta`,
  `cyan` and `white`.

- **Bright Foreground Colors**: `bright.black`, `gray`, `grey`, `bright.red`,
  `bright.green`, `bright.yellow`, `bright.blue`, `bright.magenta`,
  `bright.cyan` and `bright.white`.

- **Default Foreground Color**: `default`, `/black`, `/red`, `/green`,
  `/yellow`, `/blue`, `/magenta`, `/cyan`, `/white` and `/bright`.
 
- **Background Colors**: `bg.black`, `bg.red`, `bg.green`, `bg.yellow`,
  `bg.blue`, `bg.magenta`, `bg.cyan` and `bg.white`. Note: "bg" can be
  expanded to "background"; for example, `background.green`.

- **Bright Background Colors**: `bg.bright.black`, `bg.gray`, `bg.grey`,
  `bg.bright.red`, `bg.bright.green`, `bg.bright.yellow`, `bg.bright.blue`,
  `bg.bright.magenta`, `bg.bright.cyan` and `bg.bright.white`.

- **Default Background Color**: `bg.default`, `background.default`, `/bg`
  and `/background`.

- **Intensity Styles**: `normal`, `bold`, `/bold`, `dim` and `/dim`.

- **Accent Styles**: `italic`, `/italic`, `underline`, `/underline`, `blink`,
  `/blink`, `inverse`, `/inverse`, `conceal`, `reveal`, `/conceal`, `strike`,
  `/strike`, `frame`, `/frame`, `encircle`, `/encircle`, `overline` and
  `/overline`.

- **Fonts (Rarely Supported)**: `font0`, `font1`, `font2`, `font3`, `font4`,
  `font5`, `font6`, `font7`, `font8`, `font9`, `fraktur` and `/fraktur`.

- **Reset All Styles and Colors**: `reset`.

### apply :: (\[String\], String) -> String

```javascript
import { apply } from "@rasch/ansi"
```

The `apply` function accepts 2 arguments. The first is an array of strings
containing any of the supported tags for the `ansi` function. The second
argument is the string of text to apply the tags. The `reset` tag is
automatically applied after the given string.

### color :: Object

```javascript
import { color } from "@rasch/ansi"
```

The available colors (by name) are:

- color.black :: `String`
- color.red :: `String`
- color.green :: `String`
- color.yellow :: `String`
- color.blue :: `String`
- color.magenta :: `String`
- color.cyan :: `String`
- color.white :: `String`
- color.default :: `String`

Any of the above colors can be prefixed to use bright or background variations
such as `color.background.red`, `color.bg.red`, `color.bright.red`,
`color.background.bright.red` or `color.bg.bright.red`. The only exception is
that `color.default` doesn't have a bright variation.

The following color methods are available for setting colors by hex, rgb or
8-bit integer. To set the background color, the methods can be prefixed with
`background` or `bg`.

- color.setHex :: `String -> String` :: Accepts a string of 3 or 6 hexadecimal
  characters with or without a leading `#`. There is no validation on input
  (because it was too slow for 60 fps). Use `color.background.setHex` to set a
  background color.

- color.setRgb :: `[Number] -> String` :: Accepts an array of 3 integers between
  0 and 255 (inclusive) that represent the red, green and blue components. There
  is no validation on input. Use `color.background.setRgb` to set a background
  color.

- color.set256 :: `Number -> String` :: Accepts an integer between 0 and 255
  (inclusive) representing one of the predefined 8-bit colors. Again, there is
  no input validation. Use `color.background.set256` to set a background color.

- color.set :: `((String | [Number] | Number | Undefined), (String | [Number] | Number | Undefined)) -> String` ::
  This method is just a wrapper for the 3 methods above plus their `background`
  counterparts. The first argument is the foreground color and the second
  argument is the background color. Strings are assumed to be hex colors.
  Objects are assumed to be an array of integers representing their RGB
  components. Numbers are assumed to be an 8-bit color between 0 and 255. The
  background color argument may be omitted to set only the foreground color. To
  set the background color, use `color.background.set` which accepts only one
  argument.

### style :: Object

```javascript
import { style } from "@rasch/ansi"
```

The following style related ANSI escape sequences are available:

- style.reset :: `String` :: Reset all style and color to defaults.
- style.bold :: `String` :: Set bold intensity.
- style.dim :: `String` :: Set dim intensity.
- style.italic :: `String` :: Set italic font.
- style.underline :: `String` :: Underline text. `style.double.underline` also available.
- style.blink :: `String` :: Blinking text. `style.rapid.blink` also available.
- style.inverse :: `String` :: Invert foreground and background colors.
- style.conceal :: `String` :: Hide text. Not widely supported.
- style.strike :: `String` :: Crossed-out text.
- style.font\[0-9\] :: `String` :: Set alternate fonts, `font0` is default.
- style.fraktur :: `String` :: Gothic text. Rarely supported.
- style.normal :: `String` :: Set normal intensity (turn off bold or dim).
- style.reveal :: `String` :: Turns off `conceal`. Same as `style.no.conceal`.
- style.frame :: `String` :: Rarely supported.
- style.encircle :: `String` :: Rarely supported.
- style.overline :: `String` :: Rarely supported.

Any of these styles can be prefixed with `no` to disable them with the exception
of `style.reset`, `style.font[0-9]`, `style.normal` and `style.reveal`. For
example:

```javascript
style.bold + "hello" + style.no.bold
```

Several of the above styles are not supported by (m)any terminal emulators and
can **not** be relied upon. For example: `blink`, `font[0-9]`, `fraktur`,
`frame`, `encircle`, `overline`, `double.underline` and `rapid.blink` are not
supported in Alacritty.

### cursor :: Object

```javascript
import { cursor } from "@rasch/ansi"
```

The following methods are available for moving the cursor:

- cursor.up :: `(Number | Undefined) -> String` :: Accepts a single integer
  argument representing the number of rows to move the cursor up relative to the
  current cursor position. Defaults to `1`.

- cursor.down :: `(Number | Undefined) -> String` :: Accepts a single integer
  argument representing the number of rows to move the cursor down relative to
  the current cursor position. Defaults to `1`.

- cursor.right :: `(Number | Undefined) -> String` :: Accepts a single integer
  argument representing the number of columns to move the cursor right relative
  to the current cursor position. Defaults to `1`.

- cursor.left :: `(Number | Undefined) -> String` :: Accepts a single integer
  argument representing the number of columns to move the cursor left relative
  to the current cursor position. Defaults to `1`.

- cursor.nextLine :: `(Number | Undefined) -> String` :: Accepts a single
  integer argument representing the number of lines to move the cursor down
  relative to the current cursor position. Defaults to `1`. This method is
  similar to `cursor.down`, except the cursor also moves to the beginning of the
  line.

- cursor.prevLine :: `(Number | Undefined) -> String` :: Accepts a single
  integer argument representing the number of lines to move the cursor up
  relative to the current cursor position. Defaults to `1`. This method is
  similar to `cursor.up`, except the cursor also moves to the beginning of the
  line.

- cursor.toColumn :: `(Number | Undefined) -> String` :: Accepts a single
  integer argument representing the column to move the cursor to. Defaults to
  `0`, which moves the cursor to the beginning of its current line.

- cursor.to :: `((Number | Undefined), (Number | Undefined)) -> String` ::
  Accepts up to 2 integer arguments representing the x (column) and y (row)
  coordinates to move the cursor to. Both arguments default to `0`.

- cursor.move :: `((Number | Undefined), (Number | Undefined)) -> String` ::
  Accepts up to 2 integer arguments representing the number of columns and/or
  rows to move the cursor relative to its current position. Both arguments
  default to `0`.

The following cursor strings are available:

- cursor.position :: `String` :: Write the cursor location to stdout.
- cursor.save :: `String` :: Save the cursor position for `cursor.restore`.
- cursor.restore :: `String` :: Move the cursor to the saved position.
- cursor.hide :: `String` :: Hide the cursor.
- cursor.show :: `String` :: Show the cursor.
- cursor.home :: `String` :: Move the cursor to column 0, row 0.
- cursor.default :: `String` :: Reset the cursor shape to default.
- cursor.block :: `String` :: Change the curser shape to block.
- cursor.underline :: `String` :: Change the curser shape to underline.
- cursor.bar :: `String` :: Change the curser shape to bar.

`cursor.blinking.block`, `cursor.blinking.underline` and `cursor.blinking.bar`
are available for setting a blinking cursor.

### clear :: Object

```javascript
import { clear } from "@rasch/ansi"
```

The following strings are useful for erasing portions of the screen:

- clear.down :: `String` :: Clear the screen from the cursor down.
- clear.up :: `String` :: Clear the screen from the cursor up.
- clear.screen :: `String` :: Clear the entire screen.
- clear.toLineEnd :: `String` :: Clear from the cursor to the end of the line.
- clear.toLineStart :: `String` :: Clear from the cursor to the start of the line.
- clear.line :: `String` :: Clear the current line.

### terminal :: Object

```javascript
import { terminal } from "@rasch/ansi"
```

The `terminal` object contains methods and strings that effect the terminal
window including the following:

- terminal.scrollUp :: `(Number | Undefined) -> String` :: A method to scroll
  the screen up. Accepts a single argument representing the number of lines to
  scroll. Defaults to `1`.

- terminal.scrollDown :: `(Number | Undefined) -> String` :: A method to scroll
  the screen down. Accepts a single argument representing the number of lines to
  scroll. Defaults to `1`.

- terminal.reset :: `String` :: Reset the terminal window.
- terminal.clear :: `String` :: Same as `cursor.home` + `clear.screen`.
- terminal.beep :: `String` :: Beep Beep, Richie!

[1]: https://en.wikipedia.org/wiki/ANSI_escape_code
[2]: https://nodejs.org/api/tty.html
