import GreetingCard from "@/components/GreetingCard";
import Header from "@/components/Header";
import SpendingKPI from "@/components/SpendingKPI";
import { useTheme } from "@/hooks/useTheme";
import { View } from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        gap: 10,
      }}
    >
      <GreetingCard />
      <SpendingKPI />
    </View>
  );
}
