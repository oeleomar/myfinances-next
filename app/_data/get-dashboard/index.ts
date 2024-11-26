import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

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
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  const incomesPaid = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "INCOME",
          ...where,
          paid: true,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const expensesPaid = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "EXPENSE",
          ...where,
          paid: true,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const investimentsPaid = Number(
    (
      await db.transaction.aggregate({
        where: {
          type: "INVESTMENT",
          ...where,
          paid: true,
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount,
  );

  const totalPaid = incomesPaid + expensesPaid + investimentsPaid;

  return {
    balance,
    investmentsTotal,
    incomesTotal,
    expensesTotal,
    typesPercentages,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
    totalPaid,
  };
};
