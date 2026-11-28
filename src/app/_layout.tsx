import Header from "@/components/Header";
import { Spacing } from "@/constants/theme";
import { db } from "@/database";
import { useTheme } from "@/hooks/useTheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import migrations from "../../drizzle/migrations";

export default function RootLayout() {
  const { colors, isDark } = useTheme();
  const { success, error } = useMigrations(db, migrations);

  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.error,
    },
  };

  if (error) return <Text>{error.message}</Text>;
  if (!success) return <ActivityIndicator />;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: Spacing.md,
      }}
    >
      <ThemeProvider value={navigationTheme}>
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: navigationTheme.colors.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="Settings" />
          <Stack.Screen
            name="AddTransaction"
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
              contentStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Toast position="bottom" bottomOffset={30} />
      </ThemeProvider>
    </SafeAreaView>
  );
}
