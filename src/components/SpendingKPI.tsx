import { FontSize, FontWeight, Radius, Spacing } from "@/constants/theme";
import { useMonthlyOverview } from "@/hooks/useMonthlyOverview";
import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";
import BudgetProgressBar from "./BudgetUsageProgressBar";

const formatAmount = (amount: number): string =>
  (amount / 100).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

export default function SpendingKPI() {
  const { colors } = useTheme();
  const router = useRouter();

  const {
    budget,
    totalSpent,
    dailyAverage,
    remainingBudget,
    budgetPercentage,
    loading,
    error,
  } = useMonthlyOverview();

  const hasBudget = budget !== null && budget.currency === "INR";
  console.log(budget?.amount,totalSpent)

  const budgetColor =
    budgetPercentage >= 100
      ? "#EF4444"
      : budgetPercentage >= 80
        ? "#F59E0B"
        : colors.accent;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: Radius.sm,
        padding: Spacing.md,
        gap: Spacing.md,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: colors.accent,
            fontWeight: FontWeight.bold,
          }}
        >
          THIS MONTH
        </Text>

        {!loading && !error && (
          hasBudget ? (
            <Text
              style={{
                color: budgetColor,
                borderColor: colors.border,
                fontSize: FontSize.xs,
                borderWidth: 1,
                paddingHorizontal: Spacing.md,
                paddingVertical: Spacing.sm,
                borderRadius: Radius.sm,
                backgroundColor: `${budgetColor}20`,
              }}
            >
              {budgetPercentage.toFixed(0)}% USED
            </Text>
          ) : (
            <Pressable
              onPress={() => router.navigate("/Settings")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.primary,
                padding: Spacing.sm,
                borderRadius: 8,
                gap: 8,
              }}
            >
              <MaterialIcons
                name="account-balance-wallet"
                size={20}
                color={colors.text}
              />

              <Text style={{ color: colors.text }}>
                Set Budget
              </Text>
            </Pressable>
          )
        )}
      </View>

      {error ? (
        <Text style={{ color: "#EF4444" }}>
          Failed to load monthly overview
        </Text>
      ) : loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : (
        <>
          {/* Total spending */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: FontSize.xxl,
                fontWeight: FontWeight.bold,
              }}
            >
              ₹ {formatAmount(totalSpent)}
            </Text>

            {hasBudget && (
              <Text
                style={{
                  color: colors.text,
                  fontSize: FontSize.sm,
                  opacity: 0.7,
                }}
              >
                of ₹ {formatAmount(budget.amount)}
              </Text>
            )}
          </View>

          {/* Budget progress */}
          {hasBudget && (
            <BudgetProgressBar
              budget={budget.amount / (100*100)}
              spent={totalSpent / (100*100)}
            />
          )}

          {/* Additional KPIs */}
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingTop: Spacing.md,
            }}
          >
            {/* Daily average */}
            <View style={{ flex: 1, gap: Spacing.sm }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: FontSize.xs,
                  opacity: 0.6,
                }}
              >
                DAILY AVERAGE
              </Text>

              <Text
                style={{
                  color: colors.text,
                  fontWeight: FontWeight.bold,
                  fontSize: FontSize.xxl,
                }}
              >
                ₹ {formatAmount(dailyAverage)}
              </Text>
            </View>

            {/* Remaining budget */}
            {remainingBudget !== null && hasBudget && (
              <View
                style={{
                  flex: 1,
                  gap: Spacing.sm,
                  borderLeftWidth: 1,
                  borderLeftColor: colors.border,
                  paddingLeft: Spacing.md,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontSize: FontSize.xs,
                    opacity: 0.6,
                  }}
                >
                  {remainingBudget < 0
                    ? "OVER BUDGET"
                    : "REMAINING BUDGET"}
                </Text>

                <Text
                  style={{
                    color:
                      remainingBudget < 0
                        ? "#EF4444"
                        : colors.accent,
                    fontWeight: FontWeight.bold,
                    fontSize: FontSize.xxl,
                  }}
                >
                  ₹ {formatAmount(Math.abs(remainingBudget))}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}