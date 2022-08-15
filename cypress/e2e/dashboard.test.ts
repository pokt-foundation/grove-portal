describe("dashboard page tests", () => {
  it("should login", () => {
    cy.login("sales@pokt.network", "Oh3%BW53nzQjot")
  })
  it("should have network summary", () => {
    // should find heading
    cy.findByRole("heading", { name: /network summary/i }).should("be.visible")

    // should find nodes staked
    cy.findByRole("heading", { name: /nodes staked/i }).should("be.visible")
    // should find apps staked
    cy.findByRole("heading", { name: /apps staked/i }).should("be.visible")
    // should find networks
    cy.findByRole("heading", { name: /networks/i }).should("be.visible")
  })
  it("should have relay count", () => {
    cy.findByRole("heading", { name: /relay count/i }).should("be.visible")
  })
  it("should have available networks", () => {
    cy.findByRole("heading", { name: /available networks/i }).should("be.visible")
  })
  it("should have network success rate", () => {
    cy.findByRole("heading", { name: /network success rate/i }).should("be.visible")
  })
  it("should have latest block", () => {
    cy.findByRole("heading", { name: /latest block/i }).should("be.visible")
  })
  it("should have relay performance", () => {
    cy.findByRole("heading", { name: /relay performance/i }).should("be.visible")
  })
  it("should have pocket economics for app developers", () => {
    cy.findByRole("heading", { name: /pocket economics for app developers/i }).should(
      "be.visible",
    )
  })
  it("should have share feedback", () => {
    cy.findByRole("heading", { name: /share feedback/i }).should("be.visible")
  })
})
