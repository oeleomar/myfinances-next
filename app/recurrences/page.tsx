import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AddTransactionButton from "../_components/add-transaction-button";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/data-table";
import { RecurrenceColumns } from "./_columns";

const RecurrencesPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const transactions = await db.transaction.findMany({
    where: { isRecurring: true },
    orderBy: { date: "desc" },
  });

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Transações Recorrentes</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={RecurrenceColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default RecurrencesPage;
