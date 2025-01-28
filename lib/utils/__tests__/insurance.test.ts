import { calculateInsurancePrice } from "../insurance";
import { expect, describe, test } from "@jest/globals";

describe("calculateInsurancePrice", () => {
  test("berechnet korrekten Preis für jungen KFZ-Fahrer", () => {
    const price = calculateInsurancePrice({
      type: "KFZ",
      age: 22,
      coverage: 50000,
    });
    // 50000 * 0.01 * 1.5 (KFZ) * 1.3 (jung) = 975
    expect(price).toBe(975);
  });

  test("berechnet korrekten Preis für normalen Haftpflicht-Kunden", () => {
    const price = calculateInsurancePrice({
      type: "Haftpflicht",
      age: 35,
      coverage: 100000,
    });
    // 100000 * 0.01 * 1.0 (Haftpflicht) * 1.0 (normales Alter) = 1000
    expect(price).toBe(1000);
  });
});
