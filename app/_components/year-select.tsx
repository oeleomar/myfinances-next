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

interface YearSelectProps {
  slug?: string;
}

const YearSelect = ({ slug }: YearSelectProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const type = searchParams.get("type");

  const handleYearChange = (value: string) => {
    if (!slug) {
      push(`/?month=${month}&year=${value}`);
      return;
    }
    if (!type) {
      push(`/${slug}?month=${month}&year=${value}`);
      return;
    }
    push(`/${slug}?month=${month}&year=${value}&type=${type}`);
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
