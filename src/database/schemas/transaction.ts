import { CATEGORY, PAYMENT_METHODS } from "@/constants/enums";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),
  description: text("description"),

  // 100.5rs store 10050
  amount: integer("amount").notNull(),

  currency: text("currency").notNull().default("INR"),

  paymentMethod: text("payment_method", {
    enum: PAYMENT_METHODS,
  })
    .notNull()
    .default("upi"),
  category: text("category", {
    enum: CATEGORY,
  })
    .notNull()
    .default("bills"),

  createdAt: integer("created_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", {
    mode: "timestamp_ms",
  })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type TransactionCursor = {
  id: number;
  createdAt: Date;
};

export type TransactionPaginationInput = {
  limit?: number;
  cursor?: TransactionCursor | null;
};

export type TransactionPaginationResponse = {
  data: Transaction[];
  nextCursor: TransactionCursor | null;
  hasMore: boolean;
};
