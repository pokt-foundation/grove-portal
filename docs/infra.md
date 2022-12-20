# Infrastructure

## Hosting

We host our site through [Vercel](https://vercel.com/).

## Code Repository / Version Control

We use [Github](https://github.com/pokt-foundation) for code repositories and version control.

## Server Side Rendering

We chose to use server side rendering for the additional control and performance benefits. We decided on [remix.run](http://remix.run) as our react platform, and SSR is supported out of the box.

## Automations

The more things we can automate, the more consistent and reliable our code will be. Any automation failures will block a user from continuing further or merging code in. We have the following automations in place:

- Code build/run: Generate types, Generate graphQL sdk’s.
- Code commit: Code is linted, prettier formatting, and unit testing.
- Pull Requests: end to end testing, vercel deployment, LGTM javascript testing, scanned for secrets, linting, code coverage, unit testing.
