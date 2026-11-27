import { FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { budgetService } from "@/services/budget";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function SetMonthlyBudget() {
  const { colors } = useTheme();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [focused, setFocused] = useState(false);

  const currencySymbol = "₹";

  const handleSave = async () => {
    if (!amount || Number(amount) <= 0) return;
    try {
      const now = new Date();

      await budgetService.setBudget({
        amount: parseInt(amount),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      });
      Toast.show({
        type: "success",
        text1: "Budget updated successfully",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to save budget",
        text2: error.message,
      });
    }
    // Await your budget service here

    Keyboard.dismiss();
  };

  return (
    <View>
      <Text
        style={{
          color: colors.text,
          marginLeft: Spacing.md,
          marginBottom: Spacing.sm,
          fontSize: FontSize.lg,
          fontWeight: FontWeight.bold,
        }}
      >
        Monthly Budget
      </Text>

      {/* Card */}
      <View
        style={{
          borderWidth: 1,
          borderRadius: 16,
          padding: 18,
          gap: 12,
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <View style={styles.labelRow}>
          <MaterialIcons
            name="account-balance-wallet"
            size={22}
            color={colors.primary}
          />

          <Text style={[styles.label, { color: colors.text }]}>
            Monthly Budget Limit
          </Text>
        </View>

        <Text style={[styles.description, { color: colors.text }]}>
          Set a spending limit for your monthly expenses.
        </Text>

        {/* Input */}
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.background,
              borderColor: focused ? colors.primary : colors.border,
            },
          ]}
        >
          <Text style={[styles.currency, { color: colors.primary }]}>
            {currencySymbol}
          </Text>

          <TextInput
            style={[styles.input, { color: colors.text }]}
            value={amount}
            placeholder="0"
            placeholderTextColor={colors.text + "60"}
            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            returnKeyType="done"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onSubmitEditing={handleSave}
            selectionColor={colors.primary}
          />

          {focused && (
            <Pressable
              onPress={handleSave}
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          )}
        </View>

        <Text style={[styles.hint, { color: colors.text }]}>
          Your budget helps you track and control spending.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 60,
    gap: 8,
  },
  currency: {
    fontSize: 24,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    paddingVertical: 0,
    minWidth: 0,
  },
  saveButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.6,
  },
});
