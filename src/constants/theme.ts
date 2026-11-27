export const Colors = {
  light: {
    primary: "#062B50",
    secondary: "#007F6D",
    accent: "#009E83",

    background: "#F5F7FA",
    surface: "#FFFFFF",
    surfaceSecondary: "#EDF1F5",

    text: "#0F172A",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",

    border: "#E2E8F0",
    input: "#F1F5F9",
    icon: "#64748B",

    success: "#00875A",
    error: "#DC2626",
    warning: "#B45309",
    info: "#2563EB",

    income: "#00875A",
    expense: "#DC2626",

    primaryForeground: "#FFFFFF",
    secondaryForeground: "#FFFFFF",

    tabBar: "#FFFFFF",
    tabIconActive: "#007F6D",
    tabIconInactive: "#64748B",

    card: "#FFFFFF",
    insight: "#DDF5ED",
    insightText: "#007F6D",
  },

  dark: {
    primary: "#062B50",
    secondary: "#2DD4BF",
    accent: "#009E83",

    background: "#0B1422",
    surface: "#152235",
    surfaceSecondary: "#1C293B",

    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    textMuted: "#8493A6",

    border: "#263548",
    input: "#1C293B",
    icon: "#94A3B8",

    success: "#34D399",
    error: "#F87171",
    warning: "#FBBF24",
    info: "#60A5FA",

    income: "#34D399",
    expense: "#F87171",

    primaryForeground: "#FFFFFF",
    secondaryForeground: "#042F2E",

    tabBar: "#152235",
    tabIconActive: "#2DD4BF",
    tabIconInactive: "#94A3B8",

    card: "#152235",
    insight: "#113B37",
    insightText: "#5EEAD4",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const FontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type ThemeMode = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ThemeMode];