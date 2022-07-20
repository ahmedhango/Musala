import { FontAwesome, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@ThemeContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Text, View } from "react-native";
import { DetailedScreen } from "../screens/Detailed/index";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import { HomeScreen } from "../screens/Home/index";
import { SearchScreen } from "../screens/SearchScreen/index";
import { SettingsScreen } from "../screens/Settings/index";
import { strings } from "@Localization";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailed"
        component={DetailedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#1A8CAF",
        tabBarShowLabel: false,
        tabBarStyle: 40,
        tabBarInactiveTintColor: "#000",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 30, alignItems: "center" }}>
              {focused ? (
                <>
                  <TabBarIcon name="home" color={"#1A8CAF"} />
                  <Text style={{ color: "#1A8CAF" }}>{"Home"}</Text>
                </>
              ) : (
                <>
                  <TabBarIcon name="home" color={theme.tabIconDefault} />
                  <Text style={{ color: theme.tabIconDefault }}>{"Home"}</Text>
                </>
              )}
            </View>
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarActiveTintColor: theme.tabIconSelected,

          title: strings("Settings"),
          tabBarIcon: ({ color }) => (
            <View style={{ marginTop: 10 }}>
              <TabBarIcon name="settings" color={theme.tabIconDefault} />
              <Text>{"hi"}</Text>
            </View>
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,

          tabBarIcon: ({ color, focused }) => (
            <View style={{ marginTop: 30, alignItems: "center" }}>
              {focused ? (
                <>
                  <TabBarIcon name="settings" color={"#1A8CAF"} />
                  <Text style={{ color: "#1A8CAF" }}>{"Settings"}</Text>
                </>
              ) : (
                <>
                  <TabBarIcon name="settings" color={theme.tabIconDefault} />
                  <Text style={{ color: theme.tabIconDefault }}>
                    {"Settings"}
                  </Text>
                </>
              )}
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  const { theme } = useTheme();
  return <Feather size={30} {...props} />;
}
