"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useInsurance } from "@/context/insurance";

const formSchema = z.object({
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  street: z.string().min(1, "Straße ist erforderlich"),
  houseNumber: z.string().min(1, "Hausnummer ist erforderlich"),
  zipCode: z.string().min(5, "PLZ muss 5 Zeichen lang sein"),
  city: z.string().min(1, "Ort ist erforderlich"),
});

interface InsuranceApplicationProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function InsuranceApplication({
  onBack,
  onSubmit,
}: InsuranceApplicationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { personalInfo, setPersonalInfo, reset } = useInsurance();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: personalInfo,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setPersonalInfo(values);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    reset(); // Reset store after successful submission
    onSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-full max-w-[500px]"
      >
        <h2 className="text-[32px] font-bold text-center">
          Deine Antragsdaten
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vorname</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-14 focus:ring-2 focus:ring-[#6B7BF7] focus:ring-offset-2 transition-all"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname</FormLabel>
                <FormControl>
                  <Input {...field} className="h-14" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Straße</FormLabel>
                <FormControl>
                  <Input {...field} className="h-14" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hausnummer</FormLabel>
                <FormControl>
                  <Input {...field} className="h-14" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>PLZ</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ort</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-14 text-base"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Zurück
          </Button>
          <Button
            type="submit"
            className="flex-1 h-14 text-base font-medium"
            disabled={!form.formState.isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird eingereicht...
              </>
            ) : (
              "Verbindlich einreichen"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
