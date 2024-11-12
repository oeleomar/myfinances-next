import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { redirect } from "next/navigation";
import { TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const where = {
    userId,
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "INVESTMENT",
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
          ...where,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );
  const balance = incomesTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const typesPercentages: TransactionPercentagePerType = {
    [TransactionType.INCOME]: Math.round(
      (Number(incomesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  return {
    balance,
    investmentsTotal,
    incomesTotal,
    expensesTotal,
    typesPercentages,
  };
};
