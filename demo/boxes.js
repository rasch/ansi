import { color, cursor, terminal } from "../index.js"

const columns = process.stdout.columns
const rows = process.stdout.rows
const block = "     "

const random = max => Math.floor(Math.random() * max)
const randomHex = () => random(16_777_216).toString(16).padStart(6, 0)

let interval
let count = 0

const reset = () => {
  clearInterval(interval)
  process.stdout.write(
    cursor.to(columns, rows) + color.bg.default + "\n" + cursor.show
  )
}

const draw = () => {
  process.stdout.write(
    [...Array(69)]
    .map(() =>
      cursor.to(random(columns - block.length + 1), random(rows)) +
      color.bg.set(randomHex()) + block + cursor.move(-block.length, -1) + block
    )
    .join("")
  )

  if (count++ > 420) reset()
}

process.on("SIGINT", reset)
process.stdout.write(cursor.hide + terminal.clear)
interval = setInterval(draw, 1000 / 60)
