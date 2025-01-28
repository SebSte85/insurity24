import { NextResponse } from "next/server";
import {
  InsuranceRatingRequestSchema,
  InsuranceRatingResponseSchema,
} from "@/types/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = InsuranceRatingRequestSchema.parse(body);

    // Calculate age from birth_date
    const birthDate = new Date(validatedData.birth_date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Base premium for PHV
    let basePremium = 50; // Base premium for single

    // Apply life situation factors
    const situationFactors = {
      single: 1.0,
      pair: 1.3,
      single_with_children: 1.5,
      family: 1.8,
    };
    basePremium *= situationFactors[validatedData.life_situation];

    // Apply age factor (slight discount for older customers due to statistics)
    const ageFactor = age > 50 ? 0.9 : 1.0;
    basePremium *= ageFactor;

    // Round to 2 decimal places
    const premium = Math.round(basePremium * 100) / 100;

    const response = InsuranceRatingResponseSchema.parse({
      premium,
      currency: "EUR",
      paymentInterval: "YEARLY",
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Rating calculation error:", error);
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
