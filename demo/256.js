import { apply, color } from "../index.js"

let chart = apply(["bold", "underline"], "256 Color Palette\n")

// User defined colors (0 - 15)
for (let i = 0; i < 2; i++) {
  chart += i ? "0-15 ".padStart(8) : " ".repeat(8)
  for (let j = 0; j < 16; j++) {
    chart += color.background.set(j) + " ".repeat(4)
  }
  chart += color.background.default + "\n"
}

// Colors (16 - 231)
for (let i = 0; i < 6; i++) {
  chart += `${i * 36 + 16}-${i * 36 + 51} `.padStart(8)
  for (let j = 0; j < 36; j++) {
    chart += color.background.set((j + 16) + (i * 36)) + " ".repeat(2)
  }
  chart += color.background.default + "\n"
}

// Grayscale (232 - 255)
for (let i = 0; i < 2; i++) {
  chart += i ? " ".repeat(8) : "232-255 "
  for (let j = 232; j < 256; j++) {
    chart += color.background.set(j) + " ".repeat(3)
  }
  chart += color.background.default + "\n"
}

process.stdout.write(chart)
