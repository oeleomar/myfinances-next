import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // Efficient transaction retrieval with error handling
  const transactions = await db.transaction
    .findMany({
      where: { isRecurring: true, recurrence: { gt: 0 } },
    })
    .catch((err) => {
      console.error("Error fetching transactions:", err);
      return NextResponse.error();
    });

  if (!Array.isArray(transactions) || !transactions.length) {
    return NextResponse.json({
      success: true,
      message: "No recurring transactions found",
    });
  }

  try {
    for (const transaction of transactions) {
      if (!transaction.recurrence || transaction.recurrence < 1) continue; // Skip non-recurring transactions

      const { date, ...transactionData } = transaction;
      const day = date.getDate();
      const year = date.getFullYear();
      const month = new Date().getMonth() + 1; // Use current month to ensure correct scheduling

      await db.transaction.create({
        data: {
          ...transactionData,
          isRecurring: false,
          paid: false,
          date: new Date(`${year}-${month}-${day}`), // Updated date with current month
        },
      });

      await db.transaction.update({
        where: { id: transaction.id },
        data: {
          recurrence: transaction.recurrence - 1,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error creating or updating transactions:", err);
    return NextResponse.error();
  }
};
