import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transaction";
import { formatCurrency } from "@/app/_utils/currency";
import { Transaction } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === "INCOME") return "text-green-500";
    if (transaction.type === "EXPENSE") return "text-red-500";
    return "text-white";
  };

  const getAmoutPrefix = (transaction: Transaction) => {
    if (transaction.type === "INCOME") return "+";
    return "-";
  };
  return (
    <ScrollArea className="rounded-lg border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Ultimas Transações</CardTitle>
        <Button variant="outline" asChild className="rouded-full font-bold">
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            className="flex items-center justify-between"
            key={transaction.id}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[10%] p-3">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={24}
                  width={24}
                  alt={transaction.paymentMethod}
                  className="text-white"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmoutPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
