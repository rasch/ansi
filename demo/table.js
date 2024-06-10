import { ansi, apply } from "../index.js"

const colorGrid = function () {
  let grid = ""

  const colors = [
    "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"
  ]

  const padding = Math.max(...colors.map(c => c.length)) + "bright.".length + 1

  colors.forEach(bg => {
    ["", "bright."].forEach(b => {
      grid += `${b}${bg} `.padStart(padding)
      colors.forEach(fg => grid += 
        apply([fg, `bg.${b}${bg}`], " {dim}d{normal}n{bold}b") +
        apply([`bright.${fg}`, `bg.${b}${bg}`], "{dim}D{normal}N{bold}B ")
      )
      grid += "\n"
    })
  })

  return grid
}

console.log(ansi(
`{bold}{underline}ANSI Escape Chart{/underline}{/bold}

bold {bold}Sample{/bold}        dim {dim}Sample{/dim}      italic {italic}Sample{/italic}
underline {underline}Sample{/underline}   blink {blink}Sample{/blink}    inverse {inverse}Sample{/inverse}
conceal {conceal}Sample{/conceal}     strike {strike}Sample{/strike}

  {underline}Background\u2193   black    red    green   yellow   blue   magenta  cyan   white  {/underline}
${colorGrid()}
Legend:
  foreground color:          d = dim   n = normal   b = bold
  foreground bright.<color>: D = dim   N = normal   B = bold`
))
