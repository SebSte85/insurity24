"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InsuranceCard } from "@/components/ui/InsuranceCard";
import { InsuranceForm } from "@/components/forms/InsuranceForm";
import { InsuranceResult } from "@/components/forms/InsuranceResult";
import { InsuranceApplication } from "@/components/forms/InsuranceApplication";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(
    null
  );

  const insuranceOptions = [
    {
      title: "PHV",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
        </svg>
      ),
    },
    {
      title: "Unfall",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 4a4 4 0 100 8 4 4 0 000-8zM6 12a6 6 0 1112 0v8h-2v-6h-8v6H6v-8z" />
        </svg>
      ),
    },
    {
      title: "Wohnen",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H6v-9l6-4.5z" />
        </svg>
      ),
    },
    {
      title: "KFZ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" />
        </svg>
      ),
    },
    {
      title: "Recht",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
        </svg>
      ),
    },
    {
      title: "Hausrat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z" />
        </svg>
      ),
    },
  ];

  const handleCardClick = (title: string) => {
    if (title === "PHV") {
      setSelectedInsurance(title);
      setStep(2);
    }
  };

  const handleCalculate = () => {
    setStep(3);
  };

  const handleBack = () => {
    setStep(2);
  };

  const handleSubmit = () => {
    setStep(4);
  };

  const handleFinalSubmit = () => {
    console.log("Antrag erfolgreich eingereicht");
    setStep(1);
  };

  const getProgress = () => {
    return (step / 4) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navbar />
      <div className="flex justify-center items-center mt-4">
        <div className="h-4 w-full max-w-lg flex items-center justify-center">
          <Progress value={getProgress()} className="rounded-md bg-white" />
        </div>
      </div>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        {step === 1 ? (
          <>
            <h1 className="text-[32px] font-bold text-center mb-16">
              Welches Risiko möchtest Du versichern?
            </h1>

            <div className="grid grid-cols-3 gap-8 max-w-[500px]">
              {insuranceOptions.map((option) => (
                <InsuranceCard
                  key={option.title}
                  title={option.title}
                  icon={option.icon}
                  onClick={() => handleCardClick(option.title)}
                />
              ))}
            </div>
          </>
        ) : step === 2 ? (
          <InsuranceForm onSubmit={handleCalculate} onBack={() => setStep(1)} />
        ) : step === 3 ? (
          <InsuranceResult onBack={handleBack} onSubmit={handleSubmit} />
        ) : (
          <InsuranceApplication
            onBack={() => setStep(3)}
            onSubmit={handleFinalSubmit}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
