import { useQuery } from "@tanstack/react-query";
import { InsuranceRatingRequest, InsuranceRatingResponse } from "@/types/api";

async function fetchInsuranceRating(
  data: InsuranceRatingRequest
): Promise<InsuranceRatingResponse> {
  const response = await fetch("/api/insurance/rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate insurance rating");
  }

  return response.json();
}

export function useInsuranceRating(data: InsuranceRatingRequest) {
  return useQuery<InsuranceRatingResponse, Error>({
    queryKey: ["insuranceRating", data],
    queryFn: () => fetchInsuranceRating(data),
    enabled: !!data,
  });
}
