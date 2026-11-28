import {
  CATEGORY,
  Category,
  CATEGORY_LABELS,
  PAYMENT_METHOD_LABELS,
  PAYMENT_METHODS,
  PaymentMethod,
} from "@/constants/enums";
import { FontSize, FontWeight, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { transactionService } from "@/services/transcation";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function AddTransaction() {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [category, setCategory] = useState<Category>("bills");
  const [description, setDescription] = useState("");

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Radius.sm,
    backgroundColor: colors.card,
    color: colors.text,
    padding: Spacing.md,
    fontSize: FontSize.md,
  };

  const labelStyle = {
    color: colors.text,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.sm,
  };

  const handleSubmit = async () => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid amount", "Enter a valid amount.");
      return;
    }

    if (!title.trim()) {
      Alert.alert("Title required", "Enter a transaction title.");
      return;
    }

    const transaction = {
      amount: Math.round(numericAmount),
      title: title.trim(),
      paymentMethod,
      category,
      description: description.trim() || null,
      currency: "INR",
    };

    try {
      await transactionService.addTransaction({
        ...transaction,
      });
      router.back();
      Toast.show({
        type: "success",
        text1: "Transaction added.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to add transaction.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      {/* Backdrop */}
      <Pressable style={{ flex: 1 }} onPress={() => router.back()} />

      {/* Modal container */}
      <View
        style={{
          height: "90%",
          backgroundColor: colors.background,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: Spacing.lg,
          paddingBottom: insets.bottom + Spacing.md,
          gap: Spacing.md,
        }}
      >
        {/* Drag indicator */}
        <View
          style={{
            width: 36,
            height: 4,
            borderRadius: 10,
            backgroundColor: colors.border,
            alignSelf: "center",
          }}
        />

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
              color: colors.text,
              fontSize: FontSize.lg,
              fontWeight: FontWeight.bold,
            }}
          >
            Add Transaction
          </Text>

          <Pressable onPress={() => router.back()}>
            <MaterialIcons name="close" size={24} color={colors.text} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            gap: Spacing.lg,
            paddingBottom: Spacing.md,
          }}
        >
          {/* Amount */}
          <View>
            <Text style={labelStyle}>AMOUNT</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: Radius.sm,
                paddingHorizontal: Spacing.md,
                gap: Spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                }}
              >
                ₹
              </Text>

              <TextInput
                value={amount}
                onChangeText={(value) => {
                  if (/^\d*\.?\d{0,2}$/.test(value)) {
                    setAmount(value);
                  }
                }}
                placeholder="0.00"
                placeholderTextColor={`${colors.text}60`}
                keyboardType="decimal-pad"
                style={{
                  flex: 1,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: colors.text,
                  paddingVertical: Spacing.md,
                }}
              />
            </View>
          </View>

          {/* Title */}
          <View>
            <Text style={labelStyle}>Title</Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Grocery shopping"
              placeholderTextColor={`${colors.text}60`}
              style={inputStyle}
            />
          </View>

          {/* Payment method */}
          <View>
            <Text style={labelStyle}>Payment Method</Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: Radius.sm,
                backgroundColor: colors.card,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={paymentMethod}
                onValueChange={setPaymentMethod}
                dropdownIconColor={colors.text}
                style={{ color: colors.text }}
              >
                {PAYMENT_METHODS.map((method) => (
                  <Picker.Item
                    key={method}
                    label={PAYMENT_METHOD_LABELS[method]}
                    value={method}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Category */}
          <View>
            <Text style={labelStyle}>Category</Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: Radius.sm,
                backgroundColor: colors.card,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={category}
                onValueChange={setCategory}
                dropdownIconColor={colors.text}
                style={{ color: colors.text }}
              >
                {CATEGORY.map((item) => (
                  <Picker.Item
                    key={CATEGORY_LABELS[item]}
                    label={CATEGORY_LABELS[item]}
                    value={item}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Description */}
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={labelStyle}>Description</Text>

              <Text
                style={{
                  color: `${colors.text}70`,
                  fontSize: FontSize.sm,
                }}
              >
                Optional
              </Text>
            </View>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add a note about this transaction..."
              placeholderTextColor={`${colors.text}60`}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{
                ...inputStyle,
                minHeight: 100,
              }}
            />
          </View>
        </ScrollView>

        {/* Sticky submit button */}
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => ({
            backgroundColor: colors.accent,
            borderRadius: Radius.sm,
            padding: Spacing.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: Spacing.sm,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <MaterialIcons name="check" size={22} color="#FFFFFF" />

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: FontSize.md,
              fontWeight: FontWeight.bold,
            }}
          >
            Save Transaction
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
