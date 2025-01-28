"use client";

import { Button } from "@/components/ui/button";
import { useInsuranceRating } from "@/hooks/useInsuranceRating";
import { InsuranceRatingRequest } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useInsurance } from "@/context/insurance";

interface InsuranceResultProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function InsuranceResult({ onBack, onSubmit }: InsuranceResultProps) {
  const { lifeSituation, birthDate } = useInsurance();

  const ratingData: InsuranceRatingRequest = {
    life_situation:
      lifeSituation === "couple"
        ? "pair"
        : lifeSituation === "singleParent"
        ? "single_with_children"
        : lifeSituation === "family"
        ? "family"
        : "single",
    birth_date: birthDate,
    insurance_type: "phv",
  };

  const { data, isLoading, isError } = useInsuranceRating(ratingData);

  if (isError) {
    return (
      <div className="flex flex-col items-center space-y-6 w-full max-w-[500px]">
        <h2 className="text-[32px] font-bold text-red-600">
          Ein Fehler ist aufgetreten
        </h2>
        <p className="text-gray-600">
          Die Berechnung konnte nicht durchgeführt werden.
        </p>
        <Button variant="outline" onClick={onBack}>
          Zurück
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-12 w-full max-w-[500px]">
      <h2 className="text-[32px] font-bold">Dein Ergebnis</h2>

      <div className="relative w-48 h-48 rounded-full bg-white border-4 border-[#6B7BF7] flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <>
            <span className="text-3xl font-bold text-[#6B7BF7]">
              {data?.premium.toFixed(2)} €
            </span>
            <span className="text-[#6B7BF7]">
              {data?.paymentInterval.toLowerCase()}
            </span>
          </>
        )}
      </div>

      <div className="flex gap-4 w-full">
        <Button
          variant="outline"
          className="flex-1 h-14 text-base"
          onClick={onBack}
        >
          Zurück
        </Button>
        <Button
          className="flex-1 h-14 text-base"
          onClick={onSubmit}
          disabled={isLoading || isError}
        >
          Beantragen
        </Button>
      </div>
    </div>
  );
}
