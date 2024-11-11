import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const transactions = await db.transaction.findMany({ where: { userId } });

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={TransactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
