# Code

## React

We use React with [TypeScript](https://www.notion.so/Typescript-4b82f284f60e483982a55156cd4c8271) for our frontend codebase.

## Remix.Run

We use [remix.run](http://remix.run) as our full stack framework to deliver dynamic and progressively enhanced user experiences.

## Component Library

We have build our own component library called Pocket-Blocks. Our component library largely wraps [Mantine](https://mantine.dev/) components with theming and provides a common set of components to be used by any of our websites. This is largely used for scalability, reliability and accessibility while reducing potentially duplicated code and effort.

## GraphQL

We use graphQL for its ability to be a more performant way of calling for the data that you need in a web application. Further we have included an automated [graphQL code generator](https://www.npmjs.com/package/@graphql-codegen/cli) to build an SDK for us which automatically scans the endpoints, and configures typesets for our various graphQL endpoints.
