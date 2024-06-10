import { cursor, terminal } from "../index.js"

const column = process.argv[2]

process.stdout.write(terminal.clear)

for (let i = 0; i < process.stdout.columns; i++) {
  process.stdout.write(
    cursor.to(i, 1) + (i % 5 ? "╵" : "│" + cursor.move(-1, -1) + i)
  )
}

process.stdout.write(cursor.nextLine())

if (column) {
  for (let i = 0; i < process.stdout.rows - 5; i++) {
    process.stdout.write(cursor.toColumn(+column) + "│" + cursor.nextLine())
  }
}
