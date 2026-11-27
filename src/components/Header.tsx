import Logo from "@/assets/images/icon.png";
import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
export default function Header() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={Logo}
            style={{
              width: 50,
              height: 50,
              // borderWidth: 1,
              // borderColor: "red",
              // borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              fontSize: FontSize.lg,
              fontWeight: "700",
              color: colors.text,
            }}
          >
            Fin Sense
          </Text>
        </View>
        <Pressable
          onPress={() => router.navigate("/Settings")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary,
            padding: Spacing.sm,
            borderRadius: 8,
            gap: 8,
          }}
        >
          <Ionicons name="settings-outline" size={20} color={colors.text} />
          <Text style={{ color: colors.text, fontSize: 16 }}>Settings</Text>
        </Pressable>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: colors.border,
          marginVertical: 4,
          width: "100%",
        }}
      />
    </View>
  );
}
