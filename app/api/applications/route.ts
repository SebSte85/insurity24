import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data);

    // 1. Erstelle oder finde Person
    const { data: existingPerson, error: personLookupError } = await supabase
      .from("people")
      .select()
      .eq("email", data.email)
      .single();

    let personId;
    if (!existingPerson) {
      // Person existiert noch nicht, erstelle neu
      const { data: newPerson, error: personError } = await supabase
        .from("people")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          street: data.street,
          house_number: data.houseNumber,
          zip_code: data.zipCode,
          city: data.city,
        })
        .select()
        .single();

      if (personError) throw personError;
      personId = newPerson.id;
    } else {
      personId = existingPerson.id;
    }

    // 2. Erstelle Vertrag
    const policyNumber = `POL-${uuidv4().slice(0, 8).toUpperCase()}`;
    const { error: contractError } = await supabase.from("contracts").insert({
      person_id: personId,
      policy_number: policyNumber,
      life_situation: data.lifeSituation,
      birth_date: new Date(data.birthDate).toISOString().split("T")[0],
      status: "active",
    });

    if (contractError) throw contractError;

    return NextResponse.json({ policyNumber });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
