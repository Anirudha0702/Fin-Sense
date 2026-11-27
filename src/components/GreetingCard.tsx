import { FontSize, FontWeight, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Text, View } from "react-native";

export default function GreetingCard() {
  const { colors } = useTheme();
  const greetings = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const timeString = () => {
    const date = new Date();

    const day = date.toLocaleDateString("en-GB", {
      weekday: "long",
    });

    const dateMonth = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });

    return `${day}, ${dateMonth}`;
  };
  const monthYear = () => {
    return new Date().toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  };
  return (
    <View>
      <Text
        style={{
          fontSize: FontSize.xxl,
          fontWeight: FontWeight.bold,
          color: colors.text,
        }}
      >
        {greetings()}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: FontSize.sm,
            fontWeight: FontWeight.regular,
            color: colors.textMuted,
          }}
        >
          {timeString()}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent:'space-between',
            gap:10,
            borderWidth: 1,
            borderColor: colors.border,
            paddingInline: Spacing.md,
            borderRadius: Radius.sm,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: colors.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          </View>
          <Text
            style={{
              fontSize: FontSize.sm,
              fontWeight: FontWeight.regular,
              color: colors.textMuted,
            }}
          >
            {monthYear()}
          </Text>
        </View>
      </View>
    </View>
  );
}
