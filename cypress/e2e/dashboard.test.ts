describe("dashboard page tests", () => {
  it("should login and show dashboard", () => {
    cy.login(Cypress.env("auth0_user"), Cypress.env("auth0_password"))

    // should have network summary heading
    cy.findByRole("heading", { name: /applications/i }).should("be.visible")
  })
})
