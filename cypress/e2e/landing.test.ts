describe("landing page tests", () => {
  it("should load landing page", () => {
    cy.visit("/")

    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).to.include("loggerProvider")
      // return false to prevent the error from
      // failing this test
      return false
    })

    // should find heading
    cy.findByRole("heading", { name: /your gateway to web3 done right/i }).should(
      "be.visible",
    )

    // should find main cta
    cy.findByRole("button", { name: /get started/i }).should("be.visible")

    // should find 'docs' in navigation
    cy.findByRole("banner")
      .findByRole("navigation")
      .findByRole("link", { name: /docs/i })
      .should("have.attr", "href", "https://docs.pokt.network")

    // should find 'about pocket' in navigation
    cy.findByRole("contentinfo")
      .findByRole("navigation")
      .findByRole("link", { name: /about pokt/i })
      .should("have.attr", "href", "https://www.pokt.network/")

    // should find 'contact' in navigation
    cy.findByRole("contentinfo")
      .findByRole("navigation")
      .findByRole("link", { name: /contact/i })
      .should("have.attr", "href", "/contact-sales")

    // should find 'twitter' in navigation
    cy.findByRole("contentinfo")
      .findByRole("navigation")
      .findByRole("link", { name: /twitter/i })
      .should("have.attr", "href", "https://twitter.com/POKTnetwork")

    // should find 'discord' in navigation
    cy.findByRole("contentinfo")
      .findByRole("navigation")
      .findByRole("link", { name: /discord/i })
      .should("have.attr", "href", "https://discord.gg/pokt")

    // should find FAQs link and take you to the FAQs page
    cy.findByRole("banner")
      .findByRole("navigation")
      .findByRole("link", { name: /faqs/i })
      .click()
    cy.url().should("include", "faq")
  })
})
