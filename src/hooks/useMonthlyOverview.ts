import type { Budget } from "@/database/schemas";
import { budgetService } from "@/services/budget";
import { transactionService } from "@/services/transcation";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

export function useMonthlyOverview(currency: string = "INR") {
  const now = new Date();

  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const elapsedDays = now.getDate();

  const budgetQuery = useLiveQuery(budgetService.getBudgetQuery(month, year), [
    month,
    year,
  ]);

  const spendingQuery = useLiveQuery(
    transactionService.getMonthlySpendingQuery(month, year, currency),
    [month, year, currency],
  );

  const budget: Budget | null = budgetQuery.data?.[0] ?? null;

  const totalSpent: number = spendingQuery.data?.[0]?.totalSpent ?? 0;

  const dailyAverage: number = totalSpent / elapsedDays;

  const matchingBudget = budget?.currency === currency ? budget : null;

  const remainingBudget: number | null = matchingBudget
    ? matchingBudget.amount - totalSpent
    : null;

  const budgetPercentage: number =
    matchingBudget && matchingBudget.amount > 0
      ? (totalSpent / matchingBudget.amount) * 100
      : 0;

  const error = budgetQuery.error ?? spendingQuery.error;

  const loading =
    !error && (!budgetQuery.updatedAt || !spendingQuery.updatedAt);

  return {
    budget,
    totalSpent,
    dailyAverage,
    remainingBudget,
    budgetPercentage,
    loading,
    error,
  };
}
