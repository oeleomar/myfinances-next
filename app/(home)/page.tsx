import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "../_components/time-select";
import { isMatch } from "date-fns";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import YearSelect from "../_components/year-select";

interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthIsValid = !month || !isMatch(month, "MM");
  const yearIsValid = !year || !isMatch(year, "yyyy");
  if (monthIsValid)
    redirect(`?month=${new Date().getMonth() + 1}&year=${year}`);
  if (yearIsValid) redirect(`?month=${month}&year=${new Date().getFullYear()}`);

  const dashboard = await getDashboard(month, year);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 p-6 lg:overflow-hidden">
        <div className="flex flex-col justify-between md:flex-row">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="mt-4 flex flex-col items-center gap-6 sm:mt-0 sm:flex-row sm:gap-3">
            <AiReportButton
              month={month}
              hasProPlan={user.publicMetadata.subscriptionPlan === "PRO"}
            />
            <YearSelect />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid h-full grid-cols-1 grid-rows-2 gap-6 lg:grid-cols-3 lg:grid-rows-1 lg:overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
