import { ansi, cursor, terminal } from "../index.js"

const main = () => {
  let progress = 0

  spinner(() => progress)

  const run = setInterval(() => {
    progress += ~~(Math.random * 5) + 1
    if (progress > 99) {
      clearInterval(run)
    }
  }, 100)

  process.on("SIGINT", () => clearInterval(run))
}

const animations = {
  ascii: ["/", "-", "\\", "|"],
  fadingBlock: ["\u2591", "\u2592", "\u2593"],
  wideBlock: ["\u2592\u2591\u2591", "\u2591\u2592\u2591", "\u2591\u2591\u2592"],
  ellipses: ["\u25cf \u25cb \u25cb", "\u25cb \u25cf \u25cb", "\u25cb \u25cb \u25cf"],
  pie: ["\u25d4", "\u25d1", "\u25d5", "\u25cf"],
  rotatingTriangle: ["\u25b3", "\u25b7", "\u25bd", "\u25c1"],
  loading: [
    "       ",
    "L      ",
    "Lo     ",
    "Loa    ",
    "Load   ",
    "Loadi  ",
    "Loadin ",
    "Loading",
  ],
  colorEllipses: [
    "{red}\u25cf {yellow}\u25cb {blue}\u25cb",
    "{red}\u25cb {yellow}\u25cf {blue}\u25cb",
    "{red}\u25cb {yellow}\u25cb {blue}\u25cf",
  ],
  smile: [
`
000001111111100000
000110000000011000
011002200002200110
110000000000000011
110001000000100011
011000111111000110
000110000000011000
000001111111100000
`.replace(/0/g, " ")
 .replace(/1/g, "{bg.yellow} {/bg}")
 .replace(/2/g, "{yellow}\u2588{/yellow}"),
`
000001111111100000
000110000000011000
011002200002200110
110000000000000011
110001000000100011
011000111111000110
000110000000011000
000001111111100000
`.replace(/0/g, " ")
 .replace(/1/g, "{bg.yellow} {/bg}")
 .replace(/2/g, "{yellow}\u2584{/yellow}"),
`
000001111111100000
000110000000011000
011002200002200110
110000000000000011
110001000000100011
011000111111000110
000110000000011000
000001111111100000
`.replace(/0/g, " ")
 .replace(/1/g, "{bg.yellow} {/bg}")
 .replace(/2/g, "{yellow}_{/yellow}"),
  ],
}

const spinner = checkProgress => {
  const all = Object.keys(animations)
  const animation = animations[all[~~(Math.random() * all.length)]]

  let frame = 0

  const stopLoading = () => {
    clearInterval(loading)
    process.stdout.write(terminal.clear + cursor.show)
  }

  process.stdout.write(cursor.hide + terminal.clear)

  const loading = setInterval(() => {
    frame %= animation.length
    process.stdout.write(cursor.save + ansi(animation[frame++]) + cursor.restore)
    if (checkProgress() >= 100) stopLoading()
  }, 250)

  process.on("SIGINT", stopLoading)
}

main()
