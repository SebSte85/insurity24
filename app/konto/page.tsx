"use client";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [contracts, setContracts] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchContracts = async () => {
    setIsLoading(true);
    console.log("Suche nach Email:", email.toLowerCase().trim());
    try {
      // 1. Finde die Person anhand der Email
      const { data: person } = await supabase
        .from("people")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .single();

      console.log("Gefundene Person:", person);

      if (!person) {
        console.log("Keine Person gefunden");
        setContracts([]);
        return;
      }

      // 2. Finde alle Verträge dieser Person
      const { data: contracts } = await supabase
        .from("contracts")
        .select("*")
        .eq("person_id", person.id)
        .order("created_at", { ascending: false });

      console.log("Gefundene Verträge:", contracts);

      setContracts(contracts || []);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error Details:", {
          message: error.message,
          details: (error as any).details,
          hint: (error as any).hint,
        });
      }
      console.error("Error fetching contracts:", error);
      setContracts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Email Eingabe-Form
  if (!contracts) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="container max-w-md">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Meine Verträge</h1>
              <p className="text-gray-600 text-center">
                Gib deine E-Mail-Adresse ein, um deine Verträge anzuzeigen.
              </p>
              <div className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="name@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-4"
                />
                <Button
                  onClick={searchContracts}
                  disabled={!email || isLoading}
                  className="bg-[#6B7BF7] hover:bg-[#6B7BF7]/90 font-semibold text-base"
                >
                  {isLoading ? "Suche..." : "Verträge suchen"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Empty State
  if (!contracts.length) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full bg-gray-100">
              <FileX className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold">Keine Verträge gefunden</h2>
            <p className="text-gray-600 max-w-sm">
              Für diese E-Mail-Adresse wurden keine Verträge gefunden.
            </p>
            <div className="space-y-2">
              <Button onClick={() => setContracts(null)}>
                Andere E-Mail-Adresse
              </Button>
              <div>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:underline"
                >
                  oder neue Versicherung abschließen
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Vertragsübersicht
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <div className="container py-8 max-w-3xl mx-auto flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Meine Verträge</h1>
            <div className="flex gap-2">
              <Button variant="outline" className="text-base" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => setContracts(null)}
                className=" bg-[#6B7BF7] text-white text-base hover:bg-[#6B7BF7]/90 border-0"
              >
                Andere Mail
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="p-4 border rounded-lg bg-white space-y-3"
              >
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="text-base text-gray-500">
                    Versicherungsscheinnummer:
                  </div>
                  <div className="text-base font-semibold text-[#6B7BF7]">
                    {contract.policy_number}
                  </div>
                  <div className="text-base text-gray-500">
                    Abgeschlossen am:
                  </div>
                  <div className="text-base">
                    {new Date(contract.created_at).toLocaleDateString("de-DE")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
