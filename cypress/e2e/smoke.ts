describe("smoke tests", () => {
  it("should load landing page", () => {
    cy.visit("/")

    // should find heading
    cy.findByRole("heading", { name: /your gateway to web3 done right/i }).should(
      "be.visible",
    )

    // should find main cta
    cy.findByRole("button", { name: /get started/i }).should("be.visible")

    // should find 'about pocket' in navigation
    cy.findByRole("banner")
      .findByRole("navigation")
      .findByRole("link", { name: /about pocket/i })
      .should("have.attr", "href", "https://www.pokt.network/")

    // should find 'docs' in navigation
    cy.findByRole("banner")
      .findByRole("navigation")
      .findByRole("link", { name: /docs/i })
      .should("have.attr", "href", "https://docs.pokt.network/home/paths/app-developer")

    // should find FAQs link and take you to the FAQs page
    cy.findByRole("banner")
      .findByRole("navigation")
      .findByRole("link", { name: /faqs/i })
      .click()
    cy.url().should("include", "faq")
  })
})
