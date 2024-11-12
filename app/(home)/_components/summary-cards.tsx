import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/app/_lib/prisma";

interface SummaryCardsProps {
  month?: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const invetsmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "INVESTMENT",
          userId,
          ...where,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );
  const incomesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "INCOME",
          userId,
          ...where,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "EXPENSE",
          userId,
          ...where,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );
  const balance = incomesTotal - invetsmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        size="large"
        icon={<WalletIcon size={16} />}
        amount={balance}
        title="Saldo"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={invetsmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-income" />}
          title="Receitas"
          amount={incomesTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-danger" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
