import { interject } from "@rasch/interject"

const esc = "\x1b" // Escape
const csi = `${esc}[` // Control Sequence Introducer

// hex2rgb :: String -> String
const hex2rgb = hex => {
  if (hex.length < 6) hex = hex.replace(/./g, "$&$&")
  return hex.slice(-6).match(/../g).map(x => parseInt(x, 16)).join(";")
}

export const cursor = {
  up: (y = 1) => `${csi}${y}A`,
  down: (y = 1) => `${csi}${y}B`,
  right: (x = 1) => `${csi}${x}C`,
  left: (x = 1) => `${csi}${x}D`,
  nextLine: (y = 1) => `${csi}${y}E`,
  prevLine: (y = 1) => `${csi}${y}F`,
  toColumn: (x = 0) => `${csi}${x + 1}G`,
  to: (x = 0, y = 0) => `${csi}${y + 1};${x + 1}H`,
  move: (x = 0, y = 0) =>
    (y ? csi + (y < 0 ? `${-y}A` : `${y}B`) : "") +
    (x ? csi + (x > 0 ? `${x}C` : `${-x}D`) : ""),
  position: `${csi}6n`,
  save: `${csi}s`,
  restore: `${csi}u`,
  hide: `${csi}?25l`,
  show: `${csi}?25h`,
  home: `${csi}H`,
  default: `${csi}0 q`,
  block: `${csi}2 q`,
  underline: `${csi}4 q`,
  bar: `${csi}6 q`,
  blinking: {
    block: `${csi}1 q`,
    underline: `${csi}3 q`,
    bar: `${csi}5 q`,
  },
}

export const clear = {
  down: `${csi}J`,
  up: `${csi}1J`,
  screen: `${csi}2J`,
  toLineEnd: `${csi}K`,
  toLineStart: `${csi}1K`,
  line: `${csi}2K`,
}

export const terminal = {
  scrollUp: (y = 1) => `${csi}${y}S`,
  scrollDown: (y = 1) => `${csi}${y}T`,
  reset: `${esc}c`,
  clear: `${cursor.home}${clear.screen}`,
  beep: "\x07", // not actually an ANSI escape sequence ¯\(°_o)/¯
}

export const style = {
  reset: `${csi}m`,
  bold: `${csi}1m`,
  dim: `${csi}2m`,
  italic: `${csi}3m`,
  underline: `${csi}4m`,
  blink: `${csi}5m`,
  rapid: { blink: `${csi}6m` },
  inverse: `${csi}7m`,
  conceal: `${csi}8m`,
  strike: `${csi}9m`,
  font0: `${csi}10m`,
  font1: `${csi}11m`,
  font2: `${csi}12m`,
  font3: `${csi}13m`,
  font4: `${csi}14m`,
  font5: `${csi}15m`,
  font6: `${csi}16m`,
  font7: `${csi}17m`,
  font8: `${csi}18m`,
  font9: `${csi}19m`,
  fraktur: `${csi}20m`,
  double: { underline: `${csi}21m` },
  normal: `${csi}22m`,
  reveal: `${csi}28m`,
  frame: `${csi}51m`,
  encircle: `${csi}52m`,
  overline: `${csi}53m`,
  no: {
    bold: `${csi}22m`,
    dim: `${csi}22m`,
    italic: `${csi}23m`,
    fraktur: `${csi}23m`,
    underline: `${csi}24m`,
    blink: `${csi}25m`,
    inverse: `${csi}27m`,
    conceal: `${csi}28m`,
    strike: `${csi}29m`,
    frame: `${csi}54m`,
    encircle: `${csi}54m`,
    overline: `${csi}55m`,
  },
}

export const color = {
  black: `${csi}30m`,
  red: `${csi}31m`,
  green: `${csi}32m`,
  yellow: `${csi}33m`,
  blue: `${csi}34m`,
  magenta: `${csi}35m`,
  cyan: `${csi}36m`,
  white: `${csi}37m`,
  default: `${csi}39m`,
  bright: {
    black: `${csi}90m`,
    red: `${csi}91m`,
    green: `${csi}92m`,
    yellow: `${csi}93m`,
    blue: `${csi}94m`,
    magenta: `${csi}95m`,
    cyan: `${csi}96m`,
    white: `${csi}97m`,
  },
  background: {
    black: `${csi}40m`,
    red: `${csi}41m`,
    green: `${csi}42m`,
    yellow: `${csi}43m`,
    blue: `${csi}44m`,
    magenta: `${csi}45m`,
    cyan: `${csi}46m`,
    white: `${csi}47m`,
    default: `${csi}49m`,
    bright: {
      black: `${csi}100m`,
      red: `${csi}101m`,
      green: `${csi}102m`,
      yellow: `${csi}103m`,
      blue: `${csi}104m`,
      magenta: `${csi}105m`,
      cyan: `${csi}106m`,
      white: `${csi}107m`,
    },
  },
}

color.bg = color.background

color.setHex = fg => `${csi}38;2;${hex2rgb(fg)}m`
color.setRgb = fg => `${csi}38;2;${fg.join(";")}m`
color.set256 = fg => `${csi}38;5;${fg}m`

color.background.setHex = bg => `${csi}48;2;${hex2rgb(bg)}m`
color.background.setRgb = bg => `${csi}48;2;${bg.join(";")}m`
color.background.set256 = bg => `${csi}48;5;${bg}m`

color.set = (fg, bg) => {
  let sequence = ""

  switch (typeof fg) {
    case "number": sequence += color.set256(fg); break
    case "object": sequence += color.setRgb(fg); break
    case "string": sequence += color.setHex(fg); break
  }

  switch (typeof bg) {
    case "number": sequence += color.background.set256(bg); break
    case "object": sequence += color.background.setRgb(bg); break
    case "string": sequence += color.background.setHex(bg); break
  }

  return sequence
}

color.background.set = bg => color.set(undefined, bg)

// Create the tags object to use with the `ansi` & `apply` functions.
const ansiTags = {
  ...style,
  ...color,
  gray: color.bright.black,
  grey: color.bright.black,
  "bg.gray": color.background.bright.black,
  "bg.grey": color.background.bright.black,
  "background.gray": color.background.bright.black,
  "background.grey": color.background.bright.black,
  "bg.default": color.background.default,
  "background.default": color.background.default,
  "/bright": color.default,
  "/bg": color.background.default,
  "/background": color.background.default,
}

Object.keys(style.no).forEach(s => ansiTags[`/${s}`] = style.no[s])

Object.keys(color.bright).forEach(c => {
  ansiTags[`/${c}`] = color.default
  ansiTags[`bright.${c}`] = color.bright[c]
  ansiTags[`bg.${c}`] = color.background[c]
  ansiTags[`bg.bright.${c}`] = color.background.bright[c]
  ansiTags[`background.${c}`] = color.background[c]
  ansiTags[`background.bright.${c}`] = color.background.bright[c]
})

// ansi :: String -> String
export const ansi = str => interject(str)(ansiTags) + style.reset

// apply :: ([String], String) -> String
export const apply = (styles, text = "") => {
  const fx = styles
  .filter(effect => typeof ansiTags[effect] === "string")
  .map(effect => ansiTags[effect].slice(csi.length, -1))
  .join(";")

  return (fx ? `${csi}${fx}m` : "") + (text ? text + style.reset : "")
}
