"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.INCOME]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  investmentsTotal: number;
  incomesTotal: number;
  expensesTotal: number;
  typesPercentages: TransactionPercentagePerType;
}

export const TransactionsPieChart = ({
  investmentsTotal,
  incomesTotal,
  expensesTotal,
  typesPercentages,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.INCOME,
      amount: incomesTotal,
      fill: chartConfig[TransactionType.INCOME].color,
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: chartConfig[TransactionType.EXPENSE].color,
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: chartConfig[TransactionType.INVESTMENT].color,
    },
  ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={20} className="text-income" />}
            title="Receita"
            value={typesPercentages[TransactionType.INCOME]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={20} className="text-danger" />}
            title="Despesa"
            value={typesPercentages[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={20} />}
            title="Investido"
            value={typesPercentages[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
