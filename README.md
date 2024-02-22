# Welcome to Pocket Portal!

### Run with Remix

- [Remix Docs](https://remix.run/docs)

## Deployment

### PR / DEV

Create PR and vercel will create a preview build based on the PR

### STAGE

Merge PR into "stage" branch and vercel will build to staging environment

### PROD

Merge PR from "stage" to "main" and vercel will build to prod environment

## Development

### Frontend

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
pnpm install
```

Afterwards, start the Remix development server like so:

```sh
pnpm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

### Backend

This currently requires you to also run the current portal backend on localhost:4200 in order to run. I am working with the backend team to whitelist localhost and enable us to hit the backend.staging.portal.pokt.network endpoints.
