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

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: PaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  addTransactioSchema.parse(params);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: { id: params?.id ?? "" },
  });

  revalidatePath("/recurrences");
  revalidatePath("/transactions");
  revalidatePath("/");
};
