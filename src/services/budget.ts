import { budgetRepository } from "@/database/repositories/budget";
import type { Budget, NewBudget } from "@/database/schemas";

export type AddBudgetInput = Omit<NewBudget, "id" | "createdAt" | "updatedAt">;

export const budgetService = {
  async setBudget(data: AddBudgetInput): Promise<Budget> {
    if (!Number.isFinite(data.amount) || data.amount <= 0) {
      throw new Error("Invalid amount");
    }

    const amount = Math.round(data.amount * 100);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Invalid amount");
    }

    try {
      return await budgetRepository.setBudget({
        ...data,
        amount,
      });
    } catch (error) {
      console.error("[BudgetService.setBudget]", error);

      throw new Error("Failed to set budget", {
        cause: error,
      });
    }
  },

  async getCurrentMonthBudget(): Promise<Budget | null> {
    try {
      const now = new Date();

      return await budgetRepository.getBudget(
        now.getMonth() + 1,
        now.getFullYear(),
      );
    } catch (error) {
      console.error("[BudgetService.getCurrentMonthBudget]", error);

      throw new Error("Failed to retrieve current month budget", {
        cause: error,
      });
    }
  },

  getBudgetQuery(month: number, year: number) {
    return budgetRepository.getBudgetQuery(month, year);
  },
};
