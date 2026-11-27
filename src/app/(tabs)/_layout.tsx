import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs} from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, useColorScheme, View } from "react-native";

type TabsIconProps = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  focused: boolean;
  title: string;
  ACCENT:string
};


const TabsIcon = ({ iconName, focused, title,ACCENT }: TabsIconProps) => {
  const animation = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    const spring = Animated.spring(animation, {
      toValue: focused ? 1 : 0,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    });

    spring.start();

    return () => spring.stop();
  }, [focused, animation]);

  const iconScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <View style={styles.tabContainer}>
      <Animated.View
        style={[
          styles.activeBackground,
          {
            opacity: animation,
            transform: [{ scale: animation }],
          },
        ]}
      />

      <Animated.View style={{ transform: [{ scale: iconScale }] }}>
        <MaterialIcons
          name={iconName}
          size={24}
          color={focused ? ACCENT : "#94A3B8"}
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.label,
          {
            color: focused ? ACCENT : "#94A3B8",
          },
        ]}
      >
        {title}
      </Animated.Text>
    </View>
  );
};

export default function Layout() {
  const {colors}=useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // header: () => <Header />,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          backgroundColor: colors.background,
          borderTopColor: colors.border
        },
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabsIcon iconName="home" focused={focused} title="Home"  ACCENT={colors.accent}/>
          ),
        }}
      />

      <Tabs.Screen
        name="Transactions"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabsIcon iconName="swap-horiz" focused={focused} title="History" ACCENT={colors.accent} />
          ),
        }}
      />

      <Tabs.Screen
        name="Create"
        options={{
          title: "Pay",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              iconName="add-circle-outline"
              focused={focused}
              title="Pay"
               ACCENT={colors.accent}
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="Budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              iconName="account-balance-wallet"
              focused={focused}
              title="Budgets"
            />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="Analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ focused }) => (
            <TabsIcon
              iconName="pie-chart"
              focused={focused}
              title="Analytics"
               ACCENT={colors.accent}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    width: 64,
    height: 48,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  activeBackground: {
    position: "absolute",
    width: 64,
    height: 48,
    borderRadius: 12,
    backgroundColor: `#00f2fe`,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 3,
  },
});
