export const PAYMENT_METHODS = [
  "upi",
  "cash",
  "credit_card",
  "debit_card",
  "bank_transfer",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  upi: "UPI",
  cash: "Cash",
  credit_card: "Credit Card",
  debit_card: "Debit Card",
  bank_transfer: "Bank Transfer",
};

export const CATEGORY = [
  "food",
  "travel",
  "shopping",
  "bills",
  "entertainment",
  "health",
  "others",
] as const;

export type Category = (typeof CATEGORY)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "Food",
  travel: "Travel",
  shopping: "Shopping",
  bills: "Bills",
  entertainment: "Entertainment",
  health: "Health",
  others: "Others",
};
