"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import { addTransactioSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  date: Date;
}

export const addTransaction = async (params: AddTransactionParams) => {
  addTransactioSchema.parse(params);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.transaction.create({ data: { ...params, userId } });

  revalidatePath("/transactions");
};
