"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LifeSituation } from "@/types/insurance";

interface InsuranceContextType {
  lifeSituation?: LifeSituation;
  birthDate: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
  };
  setLifeSituation: (situation: LifeSituation) => void;
  setBirthDate: (date: string) => void;
  setPersonalInfo: (
    info: Partial<InsuranceContextType["personalInfo"]>
  ) => void;
  reset: () => void;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(
  undefined
);

export function InsuranceProvider({ children }: { children: ReactNode }) {
  const [lifeSituation, setLifeSituation] = useState<
    LifeSituation | undefined
  >();
  const [birthDate, setBirthDate] = useState("");
  const [personalInfo, setPersonalInfoState] = useState({
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
  });

  const setPersonalInfo = (
    info: Partial<InsuranceContextType["personalInfo"]>
  ) => {
    setPersonalInfoState((prev) => ({ ...prev, ...info }));
  };

  const reset = () => {
    setLifeSituation(undefined);
    setBirthDate("");
    setPersonalInfoState({
      firstName: "",
      lastName: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      city: "",
    });
  };

  return (
    <InsuranceContext.Provider
      value={{
        lifeSituation,
        birthDate,
        personalInfo,
        setLifeSituation,
        setBirthDate,
        setPersonalInfo,
        reset,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
}

export function useInsurance() {
  const context = useContext(InsuranceContext);
  if (context === undefined) {
    throw new Error("useInsurance must be used within an InsuranceProvider");
  }
  return context;
}
