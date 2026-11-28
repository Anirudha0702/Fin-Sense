import AddTransactionCard from "@/components/AddTransactionCard";
import GreetingCard from "@/components/GreetingCard";
import SpendingKPI from "@/components/SpendingKPI";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

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
      <AddTransactionCard />
    </View>
  );
}
