import { safeRedirect } from "./safeRedirect"

test("safeRedirect returns defaultRoute", () => {
  expect(safeRedirect(undefined)).toBe("/")
  expect(safeRedirect("//testing")).toBe("/")
})

test("safeRedirect returns safe route", () => {
  expect(safeRedirect("/testing")).toBe("/testing")
  expect(safeRedirect("/route")).toBe("/route")
})
