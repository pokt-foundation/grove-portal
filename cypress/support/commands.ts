Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/")

  cy.log(`Logging in as ${username}`)
  const client_id = Cypress.env("auth0_client_id")
  const client_secret = Cypress.env("auth0_client_secret")
  const audience = Cypress.env("auth0_audience")
  const scope = Cypress.env("auth0_scope")

  cy.request({
    method: "POST",
    url: `https://${Cypress.env("auth0_domain")}/oauth/token`,
    body: {
      grant_type: "password",
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
  }).then(({ body }) => {
    const cookie = {
      user: {
        accessToken: body.access_token,
        extraParams: {
          id_token: body.id_token,
          expires_in: body.expires_in,
          scope: body.scope,
          token_type: body.token_type,
        },
        profile: {
          provider: "auth0",
          displayName: "sales@pokt.network",
          id: "auth0|60ec71e6980d0b0034b3f2f3",
          name: {},
          emails: [{ value: "sales@pokt.network" }],
          photos: [
            {
              value:
                "https://secure.gravatar.com/avatar/09a5cad5ddffa4a2fa6e385529bb4657?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png",
            },
          ],
          _json: {
            sub: "auth0|60ec71e6980d0b0034b3f2f3",
            nickname: "sales",
            name: "sales@pokt.network",
            picture:
              "https://secure.gravatar.com/avatar/09a5cad5ddffa4a2fa6e385529bb4657?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png",
            updated_at: "2022-08-15T15:27:06.326Z",
            email: "sales@pokt.network",
            email_verified: true,
          },
        },
      },
      strategy: "auth0",
    }

    const data = Buffer.from(JSON.stringify(cookie))
    const encode = data.toString("base64")

    cy.setCookie("_session", encode, {
      httpOnly: true,
      sameSite: "lax",
    })

    cy.visit("/org")
  })
})
