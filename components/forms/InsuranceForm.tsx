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
import { User, Users, UserPlus, Home, Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import { useInsurance } from "@/context/insurance";
import { DatePicker } from "@/components/ui/DatePicker";
import { format } from "date-fns";

import { LifeSituation } from "@/types/insurance";

const formSchema = z.object({
  lifeSituation: z.enum([
    "single",
    "couple",
    "singleParent",
    "family",
  ] as const),
  birthDate: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, {
    message: "Bitte geben Sie das Datum im Format TT.MM.JJJJ ein",
  }),
});

interface InsuranceFormProps {
  onSubmit: () => void;
  onBack: () => void;
}

export function InsuranceForm({ onSubmit, onBack }: InsuranceFormProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const { lifeSituation, birthDate, setLifeSituation, setBirthDate } =
    useInsurance();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lifeSituation: lifeSituation,
      birthDate: birthDate,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCalculating(true);
    setLifeSituation(values.lifeSituation);
    setBirthDate(values.birthDate);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsCalculating(false);
    onSubmit();
  };

  const lifeSituations: {
    value: LifeSituation;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "single",
      label: "Single",
      icon: <User className="w-6 h-6" />,
    },
    {
      value: "couple",
      label: "Paar",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "singleParent",
      label: "Single mit Kind/ern",
      icon: <UserPlus className="w-6 h-6" />,
    },
    {
      value: "family",
      label: "Familie",
      icon: <Home className="w-6 h-6" />,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-full max-w-[500px]"
      >
        <FormField
          control={form.control}
          name="lifeSituation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold mb-4">
                Was ist deine Lebenssituation?
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-1 gap-4">
                  {lifeSituations.map((situation) => (
                    <Button
                      key={situation.value}
                      type="button"
                      variant={
                        field.value === situation.value ? "default" : "outline"
                      }
                      className="w-full justify-start h-14 text-base hover:bg-[#6B7BF7]/75 hover:text-white focus:ring-2 focus:ring-[#6B7BF7] focus:ring-offset-2"
                      onClick={() => field.onChange(situation.value)}
                    >
                      <span className="mr-3">{situation.icon}</span>
                      {situation.label}
                    </Button>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg font-semibold">
                Bitte gebe das Geburtsdatum ein
              </FormLabel>
              <FormControl>
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(format(date, "dd.MM.yyyy"));
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4 w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-14 text-base"
            onClick={onBack}
            disabled={isCalculating}
          >
            Zurück
          </Button>
          <Button
            type="submit"
            className="flex-1 h-14 text-base font-medium"
            disabled={!form.formState.isValid || isCalculating}
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Berechne...
              </>
            ) : (
              "Berechnen"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
