"use client";

import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "../_constants/transaction";
import { DatePicker } from "./ui/date-picker";
import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { upsertTransaction } from "../_actions/upsert-transaction";
import { Checkbox } from "./ui/checkbox";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: FormSchema;
  transactionId?: string;
}

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  amount: z
    .number({ required_error: "O valor é obrigatório" })
    .positive({ message: "Valor é obrigatório" }),
  type: z.nativeEnum(TransactionType, { required_error: "Tipo é obrigatório" }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "Categoria é obrigatória",
  }),
  paymentMethod: z.nativeEnum(PaymentMethod, {
    required_error: "Método de pagamento é obrigatório",
  }),
  date: z.date({ required_error: "Data é obrigatória" }),
  paid: z.boolean(),
  isRecurring: z.boolean().optional(),
  recurrence: z.number().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertTransactionDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
  transactionId,
}: UpsertTransactionDialogProps) => {
  const [submitState, setOnSubmitState] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      amount: 1,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: PaymentMethod.PIX,
      date: new Date(),
      paid: false,
      isRecurring: false,
      recurrence: 0,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setOnSubmitState(true);
    try {
      await upsertTransaction({ ...data, id: transactionId });
      setIsOpen(false);
      setOnSubmitState(false);
      form.reset();
    } catch (err) {
      console.error(err);
      setOnSubmitState(false);
    }
  };

  const isUpdate = Boolean(transactionId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Adicionar"} Transação
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo da despesa " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paid"
              render={({ field }) => (
                <FormItem className="m-0 flex items-center space-y-0">
                  <Checkbox
                    id="paid"
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                  <FormLabel className="ml-2" htmlFor="paid">
                    Já efetuei/recebi essa transação
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Checkbox
                    id="isRecurring"
                    onCheckedChange={() => {
                      field.onChange(!field.value);
                      setIsRecurring(!isRecurring);
                    }}
                    checked={field.value}
                  />
                  <FormLabel className="m-0" htmlFor="isRecurring">
                    Essa transação é recorrente
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isRecurring && (
              <FormField
                control={form.control}
                name="recurrence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantas vezes ela se repete?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="2x"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" variant="default" disabled={submitState}>
                {isUpdate ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTransactionDialog;
