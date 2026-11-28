import {
  FontSize,
  FontWeight,
  Radius,
  Spacing,
} from "@/constants/theme";
import { Transaction } from "@/database/schemas";
import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";

type Props = {
  transaction: Transaction;
  onDelete: (id: number) => void;
  deleting?: boolean;
};

type IconName = keyof typeof MaterialIcons.glyphMap;

const CATEGORY_STYLES: Record<
  string,
  { icon: IconName; color: string }
> = {
  bills: {
    icon: "receipt-long",
    color: "#60A5FA",
  },
  food: {
    icon: "restaurant",
    color: "#FB923C",
  },
  shopping: {
    icon: "shopping-bag",
    color: "#C084FC",
  },
  transport: {
    icon: "directions-bus",
    color: "#2DD4BF",
  },
  entertainment: {
    icon: "movie",
    color: "#F472B6",
  },
  health: {
    icon: "medical-services",
    color: "#34D399",
  },
};

const TRANSACTION_DELETE_WINDOW_MS =
  7 * 24 * 60 * 60 * 1000;

function canDeleteTransaction(createdAt: Date): boolean {
  const age = Date.now() - createdAt.getTime();

  return age >= 0 && age <= TRANSACTION_DELETE_WINDOW_MS;
}

function formatLabel(value: string) {
  if (value === "upi") return "UPI";

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function TransactionCard({
  transaction,
  onDelete,
  deleting = false,
}: Props) {
  const { colors } = useTheme();

  const categoryStyle =
    CATEGORY_STYLES[transaction.category] ?? {
      icon: "payments" as const,
      color: colors.accent,
    };

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: transaction.currency,
  }).format(transaction.amount / 100);

  const formattedDate = new Date(
    transaction.createdAt
  ).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const isDeletable = canDeleteTransaction(
    transaction.createdAt
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: Radius.sm,
        padding: Spacing.md,
        gap: Spacing.md,
      }}
    >
      {/* Category icon */}
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: Radius.sm,
          backgroundColor: `${categoryStyle.color}20`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={categoryStyle.icon}
          size={24}
          color={categoryStyle.color}
        />
      </View>

      {/* Transaction details */}
      <View style={{ flex: 1, gap: 4 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.text,
            fontSize: FontSize.md,
            fontWeight: FontWeight.bold,
          }}
        >
          {transaction.title}
        </Text>

        <Text
          style={{
            color: `${colors.text}90`,
            fontSize: FontSize.sm,
          }}
        >
          {formatLabel(transaction.category)}
          {" · "}
          {formatLabel(transaction.paymentMethod)}
        </Text>

        <Text
          style={{
            color: `${colors.text}70`,
            fontSize: 11,
          }}
        >
          {formattedDate}
        </Text>
      </View>

      {/* Amount and actions */}
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          gap: Spacing.sm,
        }}
      >
        <Text
          style={{
            color: colors.error,
            fontSize: FontSize.md,
            fontWeight: FontWeight.bold,
          }}
        >
          −{formattedAmount}
        </Text>

        {isDeletable && (
          <Pressable
            disabled={deleting}
            onPress={() => onDelete(transaction.id)}
            accessibilityRole="button"
            accessibilityLabel="Delete transaction"
            hitSlop={8}
            style={({ pressed }) => ({
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: Radius.sm,
              backgroundColor: `${colors.error}15`,
              opacity: pressed || deleting ? 0.5 : 1,
            })}
          >
            {deleting ? (
              <ActivityIndicator
                size="small"
                color={colors.error}
              />
            ) : (
              <MaterialIcons
                name="delete-outline"
                size={20}
                color={colors.error}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}