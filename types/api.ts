import { z } from "zod";

export const InsuranceRatingRequestSchema = z.object({
  life_situation: z.enum(["single", "pair", "single_with_children", "family"]),
  birth_date: z.string(),
  insurance_type: z.literal("phv"),
});

export const InsuranceRatingResponseSchema = z.object({
  premium: z.number(),
  currency: z.literal("EUR"),
  paymentInterval: z.literal("YEARLY"),
});

export type InsuranceRatingRequest = z.infer<
  typeof InsuranceRatingRequestSchema
>;
export type InsuranceRatingResponse = z.infer<
  typeof InsuranceRatingResponseSchema
>;
