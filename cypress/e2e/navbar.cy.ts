describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the logo", () => {
    // Prüfe das Logo
    cy.get('[data-testid="navbar-logo"]').should("exist");
    cy.get('[data-testid="navbar-logo"] img').should("be.visible");
  });

  it("should have working navigation elements", () => {
    // Prüfe das Versicherungen Dropdown
    cy.contains("Versicherungen").should("be.visible");

    // Prüfe den Konto-Link mit User-Icon
    cy.get('a[href="/konto"]').should("be.visible");
    cy.get('a[href="/konto"]').click();
    cy.url().should("include", "/konto");
  });

  it("should show insurance options in dropdown", () => {
    cy.contains("Versicherungen").click();
    cy.contains("KFZ").should("be.visible");
    cy.contains("Haftpflicht").should("be.visible");
    cy.contains("Unfall").should("be.visible");
  });
});
