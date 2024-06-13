import test from "tape"
import { color } from "../index.js"

test("color module - sanity check", t => {
  t.plan(1)
  t.equal(
    // actual
    color.magenta + "Hello, world!" + color.default,

    // expected
    "\x1b[35mHello, world!\x1b[39m"
  )
})

test("color module - background colors", t => {
  t.plan(1)
  t.equal(
    // actual
    color.background.magenta + "Hello, world!" + color.background.default,

    // expected
    "\x1b[45mHello, world!\x1b[49m"
  )
})

test("color module - background colors abbreviated", t => {
  t.plan(1)
  t.equal(
    // actual
    color.bg.black + "Hello, world!" + color.bg.default,

    // expected
    "\x1b[40mHello, world!\x1b[49m"
  )
})

test("color module - bright colors", t => {
  t.plan(1)
  t.equal(
    // actual
    color.bright.magenta + "Hello, world!" + color.default,

    // expected
    "\x1b[95mHello, world!\x1b[39m"
  )
})

test("color module - bright background colors", t => {
  t.plan(1)
  t.equal(
    // actual
    color.background.bright.white + "Hello, world!" + color.background.default,

    // expected
    "\x1b[107mHello, world!\x1b[49m"
  )
})

test("color module - setHex method", t => {
  t.plan(1)
  t.equal(
    // actual
    color.setHex("#bada55") + "Hello, world!" + color.default,

    // expected
    "\x1b[38;2;186;218;85mHello, world!\x1b[39m"
  )
})

test("color module - background.setHex method", t => {
  t.plan(1)
  t.equal(
    // actual
    color.bg.setHex("#bada55") + "Hello, world!" + color.bg.default,

    // expected
    "\x1b[48;2;186;218;85mHello, world!\x1b[49m"
  )
})

test("color module - setHex method with bad input should throw", t => {
  t.plan(1)
  t.throws(
    () => color.setHex(27) + "Hello, world!" + color.default,
    /TypeError/
  )
})

test("color module - setHex method with bad hex should set incorrect rgb", t => {
  t.plan(1)
  t.equal(
    // actual
    color.bg.setHex("#dead") + "Hello, world!" + color.bg.default,

    // expected
    "\x1b[48;2;238;170;221mHello, world!\x1b[49m"
  )
})

test("color module - setHex method with bad hex should set incorrect rgb", t => {
  t.plan(1)
  t.equal(
    // actual
    color.bg.setHex("#deadbeef") + "Hello, world!" + color.bg.default,

    // expected
    "\x1b[48;2;173;190;239mHello, world!\x1b[49m"
  )
})

test("color module - setHex method without leading '#'", t => {
  t.plan(1)
  t.equal(
    // actual
    color.setHex("bada55") + "Hello, world!" + color.default,

    // expected
    "\x1b[38;2;186;218;85mHello, world!\x1b[39m"
  )
})

test("color module - setRgb method", t => {
  t.plan(1)
  t.equal(
    // actual
    color.setRgb([69, 42, 73]) + "Hello, world!" + color.default,

    // expected
    "\x1b[38;2;69;42;73mHello, world!\x1b[39m"
  )
})

test("color module - background.setRgb method", t => {
  t.plan(1)
  t.equal(
    // actual
    color.background.setRgb([69, 42, 73]) + "Hello, world!" + color.background.default,

    // expected
    "\x1b[48;2;69;42;73mHello, world!\x1b[49m"
  )
})

test("color module - setRgb method with missing component", t => {
  t.plan(1)
  t.equal(
    // actual
    color.setRgb([69, 73]) + "Hello, world!" + color.default,

    // expected
    "\x1b[38;2;69;73mHello, world!\x1b[39m"
  )
})

test("color module - setRgb method with bad input should throw", t => {
  t.plan(1)
  t.throws(
    () => color.setRgb("#bada55") + "Hello, world!" + color.default,
    /TypeError/
  )
})

test("color module - set256 method", t => {
  t.plan(1)
  t.equal(
    // actual
    color.set256(222) + "Hello, world!" + color.default,

    // expected
    "\x1b[38;5;222mHello, world!\x1b[39m"
  )
})

test("color module - background.set256 method", t => {
  t.plan(1)
  t.equal(
    // actual
    color.background.set256(222) + "Hello, world!" + color.background.default,

    // expected
    "\x1b[48;5;222mHello, world!\x1b[49m"
  )
})

test("color module - set256 method with out of range int produces bad escape", t => {
  t.plan(1)
  t.equal(
    // actual
    color.set256(500) + "Hello, world!" + color.default,

    // expected
    "\x1b[38;5;500mHello, world!\x1b[39m"
  )
})

test("color module - set256 method given string produces bad escape", t => {
  t.plan(1)
  t.equal(
    // actual
    color.set256("#000") + "Hello, world!" + color.default,

    // expected
    "\x1b[38;5;#000mHello, world!\x1b[39m"
  )
})

test("color module - set method", t => {
  t.plan(3)
  t.equal(
    // actual
    color.set(222) + "Hello, world!" + color.default,

    // expected
    "\x1b[38;5;222mHello, world!\x1b[39m"
  )

  t.equal(
    // actual
    color.set("#bada55") + "Hello, world!" + color.default,

    // expected
    "\x1b[38;2;186;218;85mHello, world!\x1b[39m"
  )

  t.equal(
    // actual
    color.set([69, 42, 73]) + "Hello, world!" + color.default,

    // expected
    "\x1b[38;2;69;42;73mHello, world!\x1b[39m"
  )
})

test("color module - background.set method", t => {
  t.plan(3)
  t.equal(
    // actual
    color.background.set(222) + "Hello, world!" + color.background.default,

    // expected
    "\x1b[48;5;222mHello, world!\x1b[49m"
  )

  t.equal(
    // actual
    color.background.set("#bada55") + "Hello, world!" + color.background.default,

    // expected
    "\x1b[48;2;186;218;85mHello, world!\x1b[49m"
  )

  t.equal(
    // actual
    color.background.set([69, 42, 73]) + "Hello, world!" + color.background.default,

    // expected
    "\x1b[48;2;69;42;73mHello, world!\x1b[49m"
  )
})
