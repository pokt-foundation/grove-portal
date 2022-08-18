describe("dashboard page tests", () => {
  it("should login and show dashboard", () => {
    cy.login(Cypress.env("auth0_user"), Cypress.env("auth0_password"))

    // should have network summary heading
    cy.findByRole("heading", { name: /network summary/i }).should("be.visible")
    // should have network summary nodes staked
    cy.findByRole("heading", { name: /nodes staked/i }).should("be.visible")
    // should have network summary apps staked
    cy.findByRole("heading", { name: /apps staked/i }).should("be.visible")
    // should have network summary networks. using string so it matches only this card and not "available networks" card
    cy.findByRole("heading", { name: "Networks" }).should("be.visible")

    //should have relay count
    cy.findByRole("heading", { name: /relay count/i }).should("be.visible")

    // should have available networks
    cy.findByRole("heading", { name: /available networks/i }).should("be.visible")

    // should have network success rate
    cy.findByRole("heading", { name: /network success rate/i }).should("be.visible")

    // should have latest block
    cy.findByRole("heading", { name: /latest block/i }).should("be.visible")

    // should have relay performance
    cy.findByRole("heading", { name: /relay performance/i }).should("be.visible")

    // should have developer ad
    cy.findByRole("heading", { name: /pocket economics for app developers/i }).should(
      "be.visible",
    )

    // should have share feedback
    cy.findByRole("heading", { name: /share feedback/i }).should("be.visible")
  })
})
