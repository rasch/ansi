import { clear, color, cursor } from "../index.js"

const progressBar = checkProgress => {
  const bar = setInterval(() => {
    const progress = checkProgress()

    let progressBar = cursor.hide

    if (progress > 90) progressBar += color.bg.green
    else if (progress > 60) progressBar += color.bg.yellow
    else progressBar += color.bg.red

    const barWidth = process.stdout.columns - 4
    const blocks = ~~(barWidth / 100 * progress)

    progressBar += " ".repeat(blocks) + color.bg.default
    progressBar += " ".repeat(barWidth - blocks) + String(progress).padStart(3)
    progressBar += "%" + cursor.toColumn()

    process.stdout.write(progressBar)

    if (progress >= 100) {
      clearInterval(bar)
      process.stdout.write(clear.line + cursor.show)
    }
  }, 1000 / 60)

  process.on("SIGINT", () => {
    clearInterval(bar)
    process.stdout.write(cursor.show)
  })
}

const main = () => {
  let progress = 0

  progressBar(() => progress)

  const run = setInterval(() => {
    progress += ~~(Math.random() * 5) + 1
    if (progress > 99) {
      progress = 100
      clearInterval(run)
    }
  }, 200)

  process.on("SIGINT", () => clearInterval(run))
}

main()
