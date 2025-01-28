export interface InsuranceApplication {
  id: string;
  policy_number: string;
  life_situation: string;
  birth_date: string;
  first_name: string;
  last_name: string;
  email: string;
  street: string;
  house_number: string;
  zip_code: string;
  city: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
}
