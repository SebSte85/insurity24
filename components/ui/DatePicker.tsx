"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(
    value ? format(value, "dd.MM.yyyy") : ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = e.target.value.match(dateRegex);

    if (match) {
      const [_, day, month, year] = match;
      const parsedDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );

      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
        onChange(parsedDate);
      }
    }
  };

  const handleCalendarSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setInputValue(newDate ? format(newDate, "dd.MM.yyyy") : "");
    onChange(newDate);
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="TT.MM.JJJJ"
        className="pr-12"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute right-0 top-0 h-14 w-14 p-0 hover:bg-transparent"
          >
            <CalendarIcon className="h-5 w-5 text-[#6B7BF7]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalendarSelect}
            locale={de}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
