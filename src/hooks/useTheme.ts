import { useColorScheme } from "react-native";
import { Colors } from "@/constants/theme";

export function useTheme() {
  const scheme = useColorScheme() ?? "dark";

  return {
    colors: Colors[scheme],
    isDark: scheme === "dark",
    scheme,
  };
}