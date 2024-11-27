import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

type WhereProps = {
  userId: string;
  isRecurring: boolean;
  type?: "EXPENSE" | "INCOME" | "INVESTMENT";
};

export const getRecurrences = async (type?: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const where: WhereProps = {
    userId,
    isRecurring: true,
  };

  if (type && type !== "null" && type !== "ALL") {
    where["type"] = type as "EXPENSE" | "INCOME" | "INVESTMENT";
  }

  const transactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
  });

  return transactions;
};
