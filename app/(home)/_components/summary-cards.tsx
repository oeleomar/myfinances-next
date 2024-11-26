import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  investmentsTotal: number;
  incomesTotal: number;
  expensesTotal: number;
  userCanAddTransaction: boolean;
  totalPaid: number;
}

const SummaryCards = async ({
  balance,
  incomesTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
  totalPaid,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        size="large"
        icon={<WalletIcon size={16} />}
        amount={balance}
        title="Saldo"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-4 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-income" />}
          title="Receitas"
          amount={incomesTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-danger" />}
          title="Despesas"
          amount={expensesTotal}
        />
        <SummaryCard
          icon={<WalletIcon size={16} />}
          title="Saldo já pago"
          amount={totalPaid}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
