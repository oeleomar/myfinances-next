import { DataTable } from "../_components/ui/data-table";
import { TransactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import YearSelect from "../_components/year-select";
import TimeSelect from "../_components/time-select";
import { getTransactions } from "../_data/get-transactions";
import TypeSelect from "../_components/type-select";

interface TransactionsPageProps {
  searchParams: {
    month?: string;
    year?: string;
    type?: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month, year, type },
}: TransactionsPageProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const userCanAddTransaction = await canUserAddTransaction();
  const transactions = await getTransactions(month, year, type);
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Transações</h1>
          <div className="flex items-center gap-3">
            <TypeSelect slug="transactions" />
            <YearSelect slug="transactions" />
            <TimeSelect slug="transactions" />
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={TransactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
