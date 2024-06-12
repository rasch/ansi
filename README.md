# ANSI

[ANSI escape sequences][1] for CLI pizzazz!

```javascript
import { ansi, apply, color, style } from "@rasch/ansi"

process.stdout.write(ansi("{red}{bold}Error{/bold}{/red}: whoooops!\n"))
process.stdout.write(apply(["green", "italic"], "Hello, world!\n"))
process.stdout.write(color.set("#bada55", "#c55") + " hex yeah! \n" + style.reset)
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
npm install @rasch/ansi
```

## API

### ansi :: String -> String

```javascript
import { ansi } from "@rasch/ansi"
```

### apply :: (\[String\], String) -> String

```javascript
import { apply } from "@rasch/ansi"
```

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

- reset :: `String`
- bold :: `String`
- dim :: `String`
- italic :: `String`
- underline :: `String`
- blink :: `String`
- inverse :: `String`
- conceal :: `String`
- strike :: `String`
- font\[0-9\] :: `String`
- fraktur :: `String`
- normal :: `String`
- reveal :: `String`
- frame :: `String`
- encircle :: `String`
- overline :: `String`

### cursor :: Object

```javascript
import { cursor } from "@rasch/ansi"
```

- up :: `(Number | Undefined) -> String`
- down :: `(Number | Undefined) -> String`
- right :: `(Number | Undefined) -> String`
- left :: `(Number | Undefined) -> String`
- nextLine :: `(Number | Undefined) -> String`
- prevLine :: `(Number | Undefined) -> String`
- toColumn :: `(Number | Undefined) -> String`
- to :: `((Number | Undefined), (Number | Undefined)) -> String`
- move :: `((Number | Undefined), (Number | Undefined)) -> String`
- position :: `String`
- save :: `String`
- restore :: `String`
- hide :: `String`
- show :: `String`
- home :: `String`
- default :: `String`
- block :: `String`
- underline :: `String`
- bar :: `String`

### clear :: Object

```javascript
import { color } from "@rasch/ansi"
```

- down :: `String`
- up :: `String`
- screen :: `String`
- toLineEnd :: `String`
- toLineStart :: `String`
- line :: `String`

### terminal :: Object

```javascript
import { terminal } from "@rasch/ansi"
```

- scrollUp :: `(Number | Undefined) -> String`
- scrollDown :: `(Number | Undefined) -> String`
- reset :: `String`
- clear :: `String`
- beep :: `String`

[1]: https://en.wikipedia.org/wiki/ANSI_escape_code
[2]: https://nodejs.org/api/tty.html
