import {
  PaymentMethod,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";

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

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  CASH: "money.svg",
  DEBIT: "debit-card.svg",
  CREDIT: "credit-card.svg",
  CHECK: "other.svg",
  TRANSFER: "bank-transfer.svg",
  CRYPTO: "bitcoin.svg",
  PIX: "pix.svg",
  OTHER: "other.svg",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.INCOME,
    label: "Receita",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.PIX],
  },
  {
    value: PaymentMethod.DEBIT,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.DEBIT],
  },
  {
    value: PaymentMethod.CREDIT,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.CREDIT],
  },
  {
    value: PaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.CASH],
  },
  {
    value: PaymentMethod.TRANSFER,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.TRANSFER],
  },
  {
    value: PaymentMethod.CRYPTO,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.CRYPTO],
  },
  {
    value: PaymentMethod.CHECK,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.CHECK],
  },
  {
    value: PaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABEL[PaymentMethod.OTHER],
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.FOOD,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.FOOD],
  },
  {
    value: TransactionCategory.TRANSPORT,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.TRANSPORT],
  },
  {
    value: TransactionCategory.HOUSE,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.HOUSE],
  },
  {
    value: TransactionCategory.SALARY,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.SALARY],
  },
  {
    value: TransactionCategory.SHOPPING,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.SHOPPING],
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.ENTERTAINMENT],
  },
  {
    value: TransactionCategory.UTILITIES,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.UTILITIES],
  },
  {
    value: TransactionCategory.RENT,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.RENT],
  },
  {
    value: TransactionCategory.MORTGAGE,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.MORTGAGE],
  },
  {
    value: TransactionCategory.INSURANCE,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.INSURANCE],
  },
  {
    value: TransactionCategory.TAXES,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.TAXES],
  },
  {
    value: TransactionCategory.SAVINGS,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.SAVINGS],
  },
  {
    value: TransactionCategory.INVESTMENTS,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.INVESTMENTS],
  },
  {
    value: TransactionCategory.CHARITY,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.CHARITY],
  },
  {
    value: TransactionCategory.GIFTS,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.GIFTS],
  },
  {
    value: TransactionCategory.HEALTH,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.HEALTH],
  },
  {
    value: TransactionCategory.TRAVEL,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.TRAVEL],
  },
  {
    value: TransactionCategory.EDUCATION,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.EDUCATION],
  },
  {
    value: TransactionCategory.SPIRITUALITY,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.SPIRITUALITY],
  },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABEL[TransactionCategory.OTHER],
  },
];
