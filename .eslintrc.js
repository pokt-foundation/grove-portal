/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "prettier",
  ],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 27,
    },
  },
  ignorePatterns: ["public/build/*", "api/*", "coverage/*", "cypress/*"],
  rules: {
    "@typescript-eslint/consistent-type-imports": 0,
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: ["builtin", "external", "index", "parent", ["internal", "sibling"]],
      },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: false,
        reservedFirst: true,
      },
    ],
    eqeqeq: "warn",
    "no-unneeded-ternary": "error",
    "no-nested-ternary": "error",
  },
}
