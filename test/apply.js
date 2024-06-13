import test from "tape"
import { apply } from "../index.js"

test("apply function - sanity check", t => {
  t.plan(1)
  t.equal(
    // actual
    apply(["bold", "green"], "Hello, world!"),

    // expected
    "\x1b[1;32mHello, world!\x1b[m"
  )
})

test("apply function - several styles and colors", t => {
  t.plan(1)
  t.equal(
    // actual
    apply(["italic", "underline", "blue", "bg.yellow"], "Hello, world!"),

    // expected
    "\x1b[3;4;34;43mHello, world!\x1b[m"
  )
})

test("apply function - without second argument", t => {
  t.plan(1)
  t.equal(
    // actual
    apply(["dim", "cyan"]),

    // expected
    "\x1b[2;36m"
  )
})

test("apply function - with no valid styles", t => {
  t.plan(1)
  t.equal(
    // actual
    apply(["mold", "olive"], "Hello, world!"),

    // expected
    "Hello, world!\x1b[m"
  )
})
