describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the logo", () => {
    cy.get("nav").should("exist");
    cy.get("nav").contains("Insurity24").should("be.visible");
  });

  it("should have working navigation links", () => {
    // Prüfe ob der Home Link existiert und funktioniert
    cy.get("nav").contains("Home").should("be.visible");
    cy.get("nav").contains("Home").click();
    cy.url().should("include", "/");

    // Prüfe ob der Konto Link existiert
    cy.get("nav").contains("Konto").should("be.visible");
    cy.get("nav").contains("Konto").click();
    cy.url().should("include", "/konto");
  });
});
