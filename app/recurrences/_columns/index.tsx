"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  TRANSACTION_CATEGORY_LABEL,
  TRANSACTION_PAYMENT_METHOD_LABEL,
} from "@/app/_constants/transaction";
import { TransactionTypeBadge } from "@/app/_components/transactions/type-badge";
import EditTransactionButton from "@/app/_components/transactions/edit-transactionbutton";
import DeleteTransactioButton from "@/app/_components/transactions/delete-transactionbutton";

export const RecurrenceColumns: ColumnDef<Transaction>[] = [
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
    accessorKey: "recurrence",
    header: "Recorrência Restante",
    cell: ({ row: { original: transaction } }) =>
      transaction.recurrence ? `${transaction.recurrence}x` : "Nenhuma",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: transaction } }) => (
      <div className="space-x-1">
        <EditTransactionButton transaction={transaction} />
        <DeleteTransactioButton transactionId={transaction.id} />
      </div>
    ),
  },
];
