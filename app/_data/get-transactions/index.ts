import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { revalidatePath } from "next/cache";

type WhereProps = {
  userId: string;
  isRecurring: boolean;
  type?: "EXPENSE" | "INCOME" | "INVESTMENT";

  date?: {
    gte: Date;
    lt: Date;
  };
};

export const getTransactions = async (
  month?: string,
  year?: string,
  type?: string,
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const where: WhereProps = {
    userId,
    isRecurring: false,
  };

  const monthIsNotValid = !month || !isMatch(month, "MM");
  const yearIsNotValid = !year || !isMatch(year, "yyyy");
  if (!monthIsNotValid && !yearIsNotValid) {
    where["date"] = {
      gte: new Date(`${year}-${month}-01`),
      lt: new Date(`${year}-${month}-31`),
    };
  } else if (!monthIsNotValid) {
    console.log("monthIsNotValid", monthIsNotValid);
    where["date"] = {
      gte: new Date(`${new Date().getFullYear()}-${month}-01`),
      lt: new Date(`${new Date().getFullYear()}-${month}-31`),
    };
  } else if (!yearIsNotValid) {
    where["date"] = {
      gte: new Date(`${year}-01-01`),
      lt: new Date(`${year}-12-31`),
    };
  }

  if (type) {
    where["type"] = type as "EXPENSE" | "INCOME" | "INVESTMENT";
  }

  console.log("where", where);

  const transactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
  });

  revalidatePath("/transactions");
  return transactions;
};
