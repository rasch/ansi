import test from "tape"
import { terminal } from "../index.js"

test("terminal module - reset, clear and beep", t => {
  t.plan(1)
  t.equal(
    // actual
    terminal.clear + terminal.beep + terminal.reset,

    // expected
    "\x1b[H\x1b[2J\x07\x1bc"
  )
})

test("terminal module - scrollUp method", t => {
  t.plan(2)
  t.equal(
    // actual
    terminal.scrollUp() + "X",

    // expected
    "\x1b[1SX"
  )

  t.equal(
    // actual
    terminal.scrollUp(11) + "X",

    // expected
    "\x1b[11SX"
  )
})

test("terminal module - scrollDown method", t => {
  t.plan(2)
  t.equal(
    // actual
    terminal.scrollDown() + "X",

    // expected
    "\x1b[1TX"
  )

  t.equal(
    // actual
    terminal.scrollDown(23) + "X",

    // expected
    "\x1b[23TX"
  )
})
