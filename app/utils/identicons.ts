//
//
// USER IDENTICON
//
//

import MersenneTwister from "mersenne-twister"

// 9 different colors only for easy distinction (also a sweet spot for collisions)
const COLORS_NB = 9
const DEFAULT_SATURATION = 95
const DEFAULT_LIGHTNESS = 45

const MAGIC_NUMBER = 7

/**
 * @type {(str: string) => number}
 */
function simpleHash(str: string) {
  return (
    str
      .split("")
      .reduce(
        (hash, char) => (hash ^ char.charCodeAt(0)) * -MAGIC_NUMBER,
        MAGIC_NUMBER,
      ) >>> 2
  ) // 32 bit unsigned integer conversion disregarding last 2 bits for better randomness
}

/**
 * @type {import('.').minidenticon}
 */
export function minidenticon(
  seed = "",
  saturation = DEFAULT_SATURATION,
  lightness = DEFAULT_LIGHTNESS,
  hashFn = simpleHash,
) {
  const hash = hashFn(seed)
  // console.log("%c" + hash.toString(2).padStart(32, "0"), "font-family:monospace") // uncomment to debug
  const hue = (hash % COLORS_NB) * (360 / COLORS_NB)
  return (
    [...Array(seed ? 25 : 0)].reduce(
      (acc, e, i) =>
        // testing the 15 lowest weight bits of the hash
        hash & (1 << i % 15)
          ? acc +
            `<rect x="${i > 14 ? 7 - ~~(i / 5) : ~~(i / 5)}" y="${
              i % 5
            }" width="1" height="1"/>`
          : acc,
      // xmlns attribute added in case of SVG file generation https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#sect1
      `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(${hue} ${saturation}% ${lightness}%)">`,
    ) + "</svg>"
  )
}

/**
 * @type {void}
 */
export const minidenticonSvg =
  // declared as a pure function to be tree-shaken by the bundler
  /*@__PURE__*/ globalThis.customElements?.define(
    "minidenticon-svg",
    class MinidenticonSvg extends HTMLElement {
      static observedAttributes = ["username", "saturation", "lightness"]
      // private fields to allow Terser mangling
      static #memoized = {}
      #isConnected = false
      connectedCallback() {
        this.#setContent()
        this.#isConnected = true
      }
      // attributeChangedCallback() is called for every observed attribute before connectedCallback()
      attributeChangedCallback() {
        if (this.#isConnected) this.#setContent()
      }
      #setContent() {
        const args = MinidenticonSvg.observedAttributes.map(
          (key) => this.getAttribute(key) || undefined,
        )
        const memoKey = args.join(",")
        // @ts-ignore
        this.innerHTML = MinidenticonSvg.#memoized[memoKey] ??=
          // @ts-ignore
          minidenticon(...args)
      }
    },
  )

//
//
// ACCOUNT IDENTICON
//
//

// see https://github.com/danfinlay/jazzicon

const defaultColors = [
  "rgb(244, 67, 54)",
  "rgb(233, 30, 99)",
  "rgb(156, 39, 176)",
  "rgb(103, 58, 183)",
  "rgb(63, 81, 181)",
  "rgb(33, 150, 243)",
  "rgb(3, 169, 244)",
  "rgb(0, 188, 212)",
  "rgb(0, 150, 136)",
  "rgb(76, 175, 80)",
  "rgb(139, 195, 74)",
  "rgb(205, 220, 57)",
  "rgb(255, 193, 7)",
  "rgb(255, 152, 0)",
  "rgb(255, 87, 34)",
]

const hash = function (str: string) {
  if (str.length === 0) {
    return 0
  }
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = h * 31 + str.charCodeAt(i)
    h = h % 2 ** 32
  }
  return h
}

export function picasso(content: string, colors?: string[]) {
  colors = colors || defaultColors
  const seed = hash(content)
  const rand = new MersenneTwister(seed)

  colors = colors.slice()

  const genColor = () => {
    const idx = Math.floor(colors!.length * rand.random())
    return colors!.splice(idx, 1)[0]
  }

  const bgStr = `<rect fill="${genColor()}" width="100" height="100"/>`
  const style = `<style>.picasso circle{mix-blend-mode:soft-light;}</style>`
  let shapesStr = ""
  const layers = 3
  const rs = [35, 40, 45, 50, 55, 60]
  const cxs = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  const cys = [30, 40, 50, 60, 70]

  for (let i = 0; i < layers; i++) {
    const r = rs.splice(Math.floor(rs.length * rand.random()), 1)[0]
    const cx = cxs.splice(Math.floor(cxs.length * rand.random()), 1)[0]
    const cy = cys.splice(Math.floor(cys.length * rand.random()), 1)[0]
    const fill = genColor()

    shapesStr += `<circle r="${r}" cx="${cx}" cy="${cy}" fill="${fill}"/>`
  }
  return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="picasso" width="100" height="100" viewBox="0 0 100 100">${style}${bgStr}${shapesStr}</svg>`
}
