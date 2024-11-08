"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

export const TRANSACTION_CATEGORY_LABEL = {
  FOOD: "Alimentação",
  TRANSPORT: "Transporte",
  HOUSE: "Casa",
  SALARY: "Salário",
  SHOPPING: "Compras",
  ENTERTAINMENT: "Entretenimento",
  UTILITIES: "Serviços Públicos",
  RENT: "Aluguel",
  MORTGAGE: "Hipoteca",
  INSURANCE: "Seguro",
  TAXES: "Impostos",
  SAVINGS: "Poupança",
  INVESTMENTS: "Investimentos",
  CHARITY: "Doações",
  GIFTS: "Presentes",
  HEALTH: "Saúde",
  TRAVEL: "Viagem",
  EDUCATION: "Educação",
  SPIRITUALITY: "Espiritualidade",
  OTHER: "Outros",
};

export const TRANSACTION_PAYMENT_METHOD_LABEL = {
  CASH: "Dinheiro",
  DEBIT: "Débito",
  CREDIT: "Crédito",
  CHECK: "Cheque",
  TRANSFER: "Transferência",
  CRYPTO: "Criptomoeda",
  PIX: "PIX",
  OTHER: "Outro",
};

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABEL[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABEL[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="space-x-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
