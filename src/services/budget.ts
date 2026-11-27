import { budgetRepository } from "@/database/repositories/budget";
import { Budget, NewBudget } from "@/database/schemas";

export type AddBudgetInput = Omit<NewBudget, "id" | "createdAt" | "updatedAt">;
export const budgetService = {
  async setBudget(data: AddBudgetInput): Promise<Budget> {
    if (!Number.isFinite(data.amount) || data.amount <= 0) {
      throw new Error("Invalid  amount");
    }

    const amount = Math.round(data.amount * 100);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Invalid  amount");
    }
    return budgetRepository.setBudget({
      ...data,
      amount
    });
  },
  async getCurrentMonthBudget(): Promise<Budget | null> {
    try {
      const now = new Date();

      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      return await budgetRepository.getBudget(month, year);
    } catch (error) {
      console.error("[BudgetService.getCurrentMonthBudget]", error);

      throw new Error("Failed to retrieve current month budget", {
        cause: error,
      });
    }
  },
};
