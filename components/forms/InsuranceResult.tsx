"use client";

import { Button } from "@/components/ui/button";

interface InsuranceResultProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function InsuranceResult({ onBack, onSubmit }: InsuranceResultProps) {
  // Zufälliger Betrag zwischen 50 und 100
  const amount = (Math.random() * (100 - 50) + 50).toFixed(2);

  return (
    <div className="flex flex-col items-center space-y-12 w-full max-w-[500px]">
      <h2 className="text-[32px] font-bold">Dein Ergebnis</h2>

      <div className="relative w-48 h-48 rounded-full bg-white border-4 border-[#6B7BF7] flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-[#6B7BF7]">{amount} €</span>
        <span className="text-[#6B7BF7]">jährlich</span>
      </div>

      <div className="flex gap-4 w-full">
        <Button
          variant="outline"
          className="flex-1 h-14 text-base"
          onClick={onBack}
        >
          Zurück
        </Button>
        <Button className="flex-1 h-14 text-base" onClick={onSubmit}>
          Beantragen
        </Button>
      </div>
    </div>
  );
}
