import { db } from "@/database";
import {
  TransactionPaginationInput,
  TransactionPaginationResponse,
  transactions,
  type NewTransaction,
  type Transaction,
} from "@/database/schemas/transaction";
import { and, desc, eq, gte, lt, or, sql } from "drizzle-orm";
const DELETE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
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

  getMonthlySpendingQuery(month: number, year: number, currency = "INR") {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    return db
      .select({
        totalSpent: sql<number>`
        COALESCE(SUM(${transactions.amount}), 0)
      `.mapWith(Number),
      })
      .from(transactions)
      .where(
        and(
          gte(transactions.createdAt, start),
          lt(transactions.createdAt, end),
          eq(transactions.currency, currency),
        ),
      );
  },

  async getTransactions({
    limit = 20,
    cursor = null,
  }: TransactionPaginationInput): Promise<TransactionPaginationResponse> {
    const result = await db
      .select()
      .from(transactions)
      .where(
        cursor
          ? or(
              lt(transactions.createdAt, cursor.createdAt),
              and(
                eq(transactions.createdAt, cursor.createdAt),
                lt(transactions.id, cursor.id),
              ),
            )
          : undefined,
      )
      .orderBy(desc(transactions.createdAt), desc(transactions.id))
      .limit(limit + 1);

    const hasMore = result.length > limit;

    const data = result.slice(0, limit);

    const lastTransaction = data[data.length - 1];

    return {
      data,
      hasMore,
      nextCursor:
        hasMore && lastTransaction
          ? {
              id: lastTransaction.id,
              createdAt: lastTransaction.createdAt,
            }
          : null,
    };
  },
  async deleteTransaction(id: number) {
    const cutoff = new Date(Date.now() - DELETE_WINDOW_MS);

    const [deletedTransaction] = await db
      .delete(transactions)
      .where(and(eq(transactions.id, id), gte(transactions.createdAt, cutoff)))
      .returning();

    return deletedTransaction;
  },
};
