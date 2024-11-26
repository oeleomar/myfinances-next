"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../../_components/transactions/type-badge";
import {
  TRANSACTION_CATEGORY_LABEL,
  TRANSACTION_PAYMENT_METHOD_LABEL,
} from "@/app/_constants/transaction";
import EditTransactionButton from "../../_components/transactions/edit-transactionbutton";
import DeleteTransactioButton from "../../_components/transactions/delete-transactionbutton";

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
    accessorKey: "paid",
    header: "Pago",
    cell: ({ row: { original: transaction } }) =>
      transaction.paid ? <p>Sim</p> : <p>Não</p>,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: transaction } }) => (
      <div className="flex justify-end space-x-1">
        <EditTransactionButton transaction={transaction} />
        <DeleteTransactioButton transactionId={transaction.id} />
      </div>
    ),
  },
];
