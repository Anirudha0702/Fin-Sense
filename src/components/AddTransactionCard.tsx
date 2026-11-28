import { FontSize, FontWeight, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AddTransactionCard() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    // <Link href="/AddTransaction" asChild>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add transaction"
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: `${colors.accent}40`,
        borderRadius: Radius.sm,
        backgroundColor: `${colors.accent}10`,
        padding: Spacing.md,
        gap: Spacing.md,
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={() => router.navigate("/AddTransaction")}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: Radius.sm,
          backgroundColor: colors.accent,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="add" size={30} color="#FFFFFF" />
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: FontSize.md,
            fontWeight: FontWeight.bold,
          }}
        >
          Add Transaction
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: FontSize.xs,
            opacity: 0.6,
          }}
        >
          Record your daily expenses
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color={colors.accent} />
    </Pressable>
    // </Link>
  );
}
