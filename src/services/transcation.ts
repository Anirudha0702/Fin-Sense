import { transactionRepository } from "@/database/repositories/transaction";
import type {
  NewTransaction,
  Transaction,
  TransactionPaginationInput,
} from "@/database/schemas/transaction";

export type AddTransactionInput = Omit<
  NewTransaction,
  "id" | "createdAt" | "updatedAt"
>;

export const transactionService = {
  async addTransaction(data: AddTransactionInput): Promise<Transaction> {
    if (!data.title.trim()) {
      throw new Error("Transaction title is required");
    }

    if (!Number.isFinite(data.amount) || data.amount <= 0) {
      throw new Error("Invalid transaction amount");
    }

    const amount = Math.round(data.amount * 100);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Invalid transaction amount");
    }

    return transactionRepository.addTransaction({
      ...data,
      title: data.title.trim(),
      description: data.description?.trim() || null,
      amount,
    });
  },
  getMonthlySpendingQuery(month: number, year: number, currency = "INR") {
    return transactionRepository.getMonthlySpendingQuery(month, year, currency);
  },
  async getTransactions({
    limit = 20,
    cursor = null,
  }: TransactionPaginationInput = {}) {
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new Error("Invalid pagination limit");
    }

    return transactionRepository.getTransactions({
      limit,
      cursor,
    });
  },
  async deleteTransaction(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid transaction ID");
  }

  const deletedTransaction =
    await transactionRepository.deleteTransaction(id);

  if (!deletedTransaction) {
    throw new Error(
      "Transaction does not exist or its deletion period has expired."
    );
  }

  return deletedTransaction;
},
};
