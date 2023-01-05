# Code Quality

The following sections specifically refer to ways we maintain code quality across our codebase.

## Linting

We opted to keep the basic linting configuration from remix and then extend out as we needed, we have currently had little need to greatly alter the default linting from remix.

[pocket-portal/.eslintrc.js at stage · pokt-foundation/pocket-portal](https://github.com/pokt-foundation/pocket-portal/blob/stage/.eslintrc.js)

## Prettier

We use prettier for code formatting, a link to our prettier settings can be found here:

[pocket-portal/.prettierrc at stage · pokt-foundation/pocket-portal](https://github.com/pokt-foundation/pocket-portal/blob/stage/.prettierrc)

## Unit Testing

We aim to uphold unit testing to be above a 75% threshold and often our unit testing is a good bit higher. This provides a high level of confidence that new changes will not break existing functionality, especially when used in conjunction with end to end tests.

For unit testing, we use the following: [testing-library](https://testing-library.com/), and [jest-axe](https://www.npmjs.com/package/jest-axe)

## End to End testing

We use end to end testing as a way to provide confidence in our code that our user flows work and function as expected.

For end to end testing, we use [cypress](https://www.cypress.io/).
