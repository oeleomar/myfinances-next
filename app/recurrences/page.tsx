import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AddTransactionButton from "../_components/add-transaction-button";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/data-table";
import { RecurrenceColumns } from "./_columns";
import TypeSelect from "../_components/type-select";
import { getRecurrences } from "../_data/get-recurrences";

interface RecurrencesPageProps {
  searchParams: {
    type?: string;
  };
}

const RecurrencesPage = async ({
  searchParams: { type },
}: RecurrencesPageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const transactions = await getRecurrences(type);

  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Transações Recorrentes</h1>
          <div className="flex items-center gap-3">
            <TypeSelect slug="recurrences" />
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
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
