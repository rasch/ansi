import test from "tape"
import { ansi } from "../index.js"

test("ansi function - sanity check", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{bold}Hello{/bold}, {green}world{/green}!"),

    // expected
    "\x1b[1mHello\x1b[22m, \x1b[32mworld\x1b[39m!\x1b[m"
  )
})

test("ansi function - foreground color", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{red}Hello{default}, {cyan}world{/cyan}!"),

    // expected
    "\x1b[31mHello\x1b[39m, \x1b[36mworld\x1b[39m!\x1b[m"
  )
})

test("ansi function - background color", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{bg.red}Hello{bg.default}, {bg.cyan}world{/bg}!"),

    // expected
    "\x1b[41mHello\x1b[49m, \x1b[46mworld\x1b[49m!\x1b[m"
  )
})

test("ansi function - bright color", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{bright.red}Hello{default}, {bright.cyan}world{/bright}!"),

    // expected
    "\x1b[91mHello\x1b[39m, \x1b[96mworld\x1b[39m!\x1b[m"
  )
})

test("ansi function - background bright color", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{bg.bright.red}Hello{bg.default}, {bg.bright.cyan}world{/bg}!"),

    // expected
    "\x1b[101mHello\x1b[49m, \x1b[106mworld\x1b[49m!\x1b[m"
  )
})

test("ansi function - background color again", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{background.red}Hello{background.default}, {background.cyan}world{/background}!"),

    // expected
    "\x1b[41mHello\x1b[49m, \x1b[46mworld\x1b[49m!\x1b[m"
  )
})

test("ansi function - intensity styles", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{bold}Hello{normal}, {dim}world{/dim}!"),

    // expected
    "\x1b[1mHello\x1b[22m, \x1b[2mworld\x1b[22m!\x1b[m"
  )
})

test("ansi function - accent styles", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{italic}Hello{/italic}, {strike}world{/strike}!"),

    // expected
    "\x1b[3mHello\x1b[23m, \x1b[9mworld\x1b[29m!\x1b[m"
  )
})

test("ansi function - fonts", t => {
  t.plan(1)
  t.equal(
    // actual
    ansi("{fraktur}Hello{/fraktur}, {font1}world{font0}!"),

    // expected
    "\x1b[20mHello\x1b[23m, \x1b[11mworld\x1b[10m!\x1b[m"
  )
})
