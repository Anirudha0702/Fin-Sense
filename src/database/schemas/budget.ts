import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const budgets = sqliteTable(
  "budgets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    month: integer("month").notNull(), // 1–12

    year: integer("year").notNull(),

    amount: integer("amount").notNull(),

    currency: text("currency").notNull().default("INR"),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .notNull(),

    updatedAt: integer("updated_at", {
      mode: "timestamp_ms",
    })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("budget_month_year_idx").on(
      table.month,
      table.year
    ),
  ]
);

export type Budget = typeof budgets.$inferSelect;
export type NewBudget = typeof budgets.$inferInsert;