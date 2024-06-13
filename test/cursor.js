import test from "tape"
import { cursor } from "../index.js"

test("cursor module - sanity check", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.up() + "X" +
    cursor.right() + "X" +
    cursor.down() + "X" +
    cursor.left() + "X",

    // expected
    "\x1b[1AX\x1b[1CX\x1b[1BX\x1b[1DX"
  )
})

test("cursor module - up, right, down, left", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.up(42) + "X" +
    cursor.right(23) + "X" +
    cursor.down(37) + "X" +
    cursor.left(13) + "X",

    // expected
    "\x1b[42AX\x1b[23CX\x1b[37BX\x1b[13DX"
  )
})

test("cursor module - nextLine, prevLine", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.nextLine(37) + "X" +
    cursor.prevLine(13) + "X",

    // expected
    "\x1b[37EX\x1b[13FX"
  )
})

test("cursor module - nextLine, prevLine with no arguments", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.nextLine() + "X" +
    cursor.prevLine() + "X",

    // expected
    "\x1b[1EX\x1b[1FX"
  )
})

test("cursor module - toColumn", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.toColumn(37) + "X",

    // expected
    "\x1b[38GX"
  )
})

test("cursor module - toColumn with no arguments", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.toColumn() + "X",

    // expected
    "\x1b[1GX"
  )
})

test("cursor module - to method", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.to(69, 42) + "X",

    // expected
    "\x1b[43;70HX"
  )
})

test("cursor module - to method with no arguments", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.to() + "X",

    // expected
    "\x1b[1;1HX"
  )
})

test("cursor module - to method with one argument", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.to(42) + "X",

    // expected
    "\x1b[1;43HX"
  )
})

test("cursor module - move method", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.move(42, 69) + "X",

    // expected
    "\x1b[69B\x1b[42CX"
  )
})

test("cursor module - move method with negative integers", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.move(-42, -69) + "X",

    // expected
    "\x1b[69A\x1b[42DX"
  )
})

test("cursor module - move method with no arguments", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.move() + "X",

    // expected
    "X"
  )
})

test("cursor module - move method with one argument", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.move(42) + "X",

    // expected
    "\x1b[42CX"
  )
})

test("cursor module - move method with one negative integer argument", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.move(-42) + "X",

    // expected
    "\x1b[42DX"
  )
})

test("cursor module - position strings", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.position + cursor.save + cursor.home + "X" + cursor.restore,

    // expected
    "\x1b[6n\x1b[s\x1b[HX\x1b[u"
  )
})

test("cursor module - hide and show strings", t => {
  t.plan(1)
  t.equal(
    // actual
    cursor.hide + cursor.home + "X" + cursor.show,

    // expected
    "\x1b[?25l\x1b[HX\x1b[?25h"
  )
})

test("cursor module - cursor shape strings", t => {
  t.plan(2)
  t.equal(
    // actual
    cursor.block + "X" + cursor.underline + "X" + cursor.bar + "X" + cursor.default,

    // expected
    "\x1b[2 qX\x1b[4 qX\x1b[6 qX\x1b[0 q"
  )

  t.equal(
    // actual
    cursor.blinking.block + "X" + cursor.blinking.underline + "X" + cursor.blinking.bar + "X" + cursor.default,

    // expected
    "\x1b[1 qX\x1b[3 qX\x1b[5 qX\x1b[0 q"
  )
})
