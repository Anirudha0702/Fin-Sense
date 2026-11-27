import { transactionRepository } from "@/database/repositories/transaction";
import type {
  NewTransaction,
  Transaction,
} from "@/database/schemas/transaction";

export type AddTransactionInput = Omit<
  NewTransaction,
  "id" | "createdAt" | "updatedAt"
>;

export const transactionService = {
  async addTransaction(
    data: AddTransactionInput
  ): Promise<Transaction> {
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
};