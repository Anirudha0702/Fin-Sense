import { FontSize, FontWeight, Radius, Spacing } from "@/constants/theme";
import { Budget } from "@/database/schemas";
import { useTheme } from "@/hooks/useTheme";
import { budgetService } from "@/services/budget";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import BudgetProgressBar from "./BudgetUsageProgressBar";

export default function SpendingKPI() {
  const { colors } = useTheme();
  const router = useRouter();

  const [budget, setBudget] = useState<Budget | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const fetchBudget = async () => {
        try {
          const res = await budgetService.getCurrentMonthBudget();

          if (active) {
            setBudget(res);
          }
        } catch (error) {
          console.error(error);
          Toast.show({
            type: "error",
            text1: "Unable to fetch budget",
          });
        }
      };

      fetchBudget();

      return () => {
        active = false;
      };
    }, []),
  );
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: Radius.sm,
        padding: Spacing.md,
      }}
    >
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
        {budget ? (
          <Text
            style={{
              color: colors.accent,
              borderColor: colors.border,
              fontSize: FontSize.xs,
              borderWidth: 1,
              paddingInline: Spacing.md,
              backgroundColor: `${colors.accent}20`,
            }}
          >
            0% USED
          </Text>
        ) : (
          <Pressable
            onPress={() => router.navigate("/Settings")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
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
            <Text style={{ color: colors.text, fontSize: 16 }}>Set Budget</Text>
          </Pressable>
        )}
      </View>
      {budget && (
        <View>
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
              ₹ 1,000.
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: FontSize.sm,
              }}
            >
              of ₹ {(budget.amount / 100).toLocaleString("en-IN")}
            </Text>
          </View>
          <BudgetProgressBar budget={budget.amount / 100} spent={1000} />
        </View>
      )}
    </View>
  );
}
