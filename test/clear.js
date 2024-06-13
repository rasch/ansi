import test from "tape"
import { clear } from "../index.js"

test("clear module - screen", t => {
  t.plan(1)
  t.equal(
    // actual
    clear.down + clear.up + clear.screen,

    // expected
    "\x1b[J\x1b[1J\x1b[2J"
  )
})

test("clear module - line", t => {
  t.plan(1)
  t.equal(
    // actual
    clear.toLineStart + clear.toLineEnd + clear.line,

    // expected
    "\x1b[1K\x1b[K\x1b[2K"
  )
})
