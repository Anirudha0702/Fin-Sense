import { and, eq } from "drizzle-orm";
import { db } from "..";
import { Budget, budgets, NewBudget } from "../schemas/budget";
export const budgetRepository = {
  async setBudget(budget: NewBudget): Promise<Budget> {
    const [res] = await db
      .insert(budgets)
      .values(budget)
      .onConflictDoUpdate({
        target: [budgets.month, budgets.year],
        set: {
          amount: budget.amount,
          updatedAt: new Date(),
        },
      })
      .returning();
    if (!res) throw Error("Failed to set budget");
    return res;
  },
  async getBudget(month: number, year: number): Promise<Budget | null> {
    const [res] = await db
      .select()
      .from(budgets)
      .where(and(eq(budgets.month, month), eq(budgets.year, year)))
      .limit(1);

    return res ?? null;
  },
  getBudgetQuery(month: number, year: number) {
    return db
      .select()
      .from(budgets)
      .where(and(eq(budgets.month, month), eq(budgets.year, year)))
      .limit(1);
  },
};
