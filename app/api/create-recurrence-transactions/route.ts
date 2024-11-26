import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const transactions = await db.transaction.findMany({
    where: { isRecurring: true, recurrence: { gt: 0 } },
  });

  try {
    transactions.forEach(async (transaction) => {
      if (!transaction.recurrence || transaction.recurrence < 1) return;

      const day = transaction.date.getDate();
      const year = transaction.date.getFullYear();

      await db.transaction.create({
        data: {
          ...transaction,
          isRecurring: false,
          paid: false,
          date: new Date(`${year}-${new Date().getMonth() + 1}-${day}`),
        },
      });

      await db.transaction.update({
        where: { id: transaction.id },
        data: {
          recurrence: transaction.recurrence - 1,
        },
      });
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.error();
  }
};
