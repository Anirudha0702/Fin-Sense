import { db } from "@/database";
import {
  transactions,
  type NewTransaction,
  type Transaction,
} from "@/database/schemas/transaction";

export const transactionRepository = {
  async addTransaction(data: NewTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(data)
      .returning();

    if (!transaction) {
      throw new Error("Failed to add transaction");
    }

    return transaction;
  },
};