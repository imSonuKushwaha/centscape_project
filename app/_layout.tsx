import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E6F9E6" }}>
      <Tabs
        initialRouteName="dashboard" // 👈 forces Dashboard as default
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" }, // hide default bar
        }}
        tabBar={(props) => <CustomTabBar {...props} />}
      />
    </SafeAreaView>
  );
}

import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const routes = ["dashboard", "wallet", "wishlist", "profile"]; // only 4

  return (
    <SafeAreaView edges={["bottom"]}>
      <View style={styles.container}>
        {routes.map((name) => {
          const isFocused = state.routes[state.index].name === name;

          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (name === "dashboard")
            iconName = isFocused ? "home" : "home-outline";
          if (name === "wallet")
            iconName = isFocused ? "wallet" : "wallet-outline";
          if (name === "wishlist")
            iconName = isFocused ? "cart" : "cart-outline";
          if (name === "profile")
            iconName = isFocused ? "person" : "person-outline";

          return (
            <TouchableOpacity
              key={name}
              onPress={() => navigation.navigate(name)}
              style={[styles.tabButton, isFocused && styles.activeTab]}
            >
              <Ionicons
                name={iconName}
                size={32}
                color={isFocused ? "#fff" : "#ccc"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabButton: {
    width: 50,
    height: 50,
    backgroundColor: "#333", // default dark
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#000", // darker when active
  },
});
