import { MantineColorScheme } from "@mantine/core"
import { createCookieSessionStorage } from "@remix-run/node"

// const sessionSecret = ""
// if (!sessionSecret) {
//   throw new Error("SESSION_SECRET must be set")
// }

const colorSchemeStorage = createCookieSessionStorage({
  // TODO: Sign the cookie with a secret
  cookie: {
    name: "grove_color_scheme",
    secure: true,
    // secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
})

async function getColorSchemeSession(request: Request) {
  const session = await colorSchemeStorage.getSession(request.headers.get("Cookie"))
  return {
    getTheme: (): MantineColorScheme => {
      return session.get("mantine-color-scheme")
    },
    setColorScheme: (colorScheme: MantineColorScheme) =>
      session.set("mantine-color-scheme", colorScheme),
    commit: () => colorSchemeStorage.commitSession(session),
  }
}

export { getColorSchemeSession }
