"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const YEAR_OPTIONS = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
];
const YearSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const handleYearChange = (value: string) => {
    push(`/?month=${month}&year=${value}`);
  };

  return (
    <Select
      onValueChange={(value) => handleYearChange(value)}
      defaultValue={year || ""}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Ano" />
      </SelectTrigger>
      <SelectContent>
        {YEAR_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
