interface InsuranceParams {
  type: "KFZ" | "Haftpflicht" | "Unfall";
  age: number;
  coverage: number;
}

export function calculateInsurancePrice(params: InsuranceParams): number {
  const { type, age, coverage } = params;

  // Basis-Multiplikatoren
  const typeMultiplier = {
    KFZ: 1.5,
    Haftpflicht: 1.0,
    Unfall: 1.2,
  };

  // Altersbasierter Rabatt (jünger = teurer)
  const ageDiscount = age < 25 ? 1.3 : age > 60 ? 1.1 : 1.0;

  // Grundpreis basierend auf Deckungssumme
  const basePrice = coverage * 0.01;

  return Math.round(basePrice * typeMultiplier[type] * ageDiscount);
}
