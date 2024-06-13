import test from "tape"
import { style } from "../index.js"

test("style module - sanity check", t => {
  t.plan(1)
  t.equal(
    // actual
    style.inverse + "Hello, world!" + style.no.inverse,

    // expected
    "\x1b[7mHello, world!\x1b[27m"
  )
})

test("style module - several styles", t => {
  t.plan(1)
  t.equal(
    // actual
    style.italic + style.bold + style.underline + "Hello, world!" + style.reset,

    // expected
    "\x1b[3m\x1b[1m\x1b[4mHello, world!\x1b[m"
  )
})
