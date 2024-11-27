"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const TYPE_OPTIONS = [
  {
    value: "ALL",
    label: "Todos",
  },
  {
    value: "EXPENSE",
    label: "Despesa",
  },
  {
    value: "INCOME",
    label: "Receita",
  },
  {
    value: "INVESTMENT",
    label: "Investimento",
  },
];

interface TypeSelectProps {
  slug?: string;
}

const TypeSelect = ({ slug }: TypeSelectProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const handleMonthChange = (value: string) => {
    if (value === "ALL") {
      push(`/${slug}?month=${month}&year=${year}`);
      return;
    }
    push(`/${slug}?month=${month}&year=${year}&type=${value}`);
  };

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={undefined}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Tipo" />
      </SelectTrigger>
      <SelectContent>
        {TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label.replace(/^\w/, (c) => c.toUpperCase())}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TypeSelect;
