import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import {
  Appearance,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "@ThemeContext";
import ThemeWrapper from "components/ThemeWrapper";
import { QueryClient, QueryClientProvider } from "react-query";
import { NetworkConnection } from "components/NetworkConnection/NetworkConnection";
import CustomStatusBar from "components/CustomStatusBar";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeContext>
        <ThemeWrapper>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <NetworkConnection />
              <SafeAreaView style={{ flex: 1 }}>
                <CustomStatusBar />
                <Navigation colorScheme={colorScheme} />
              </SafeAreaView>
            </SafeAreaProvider>
          </QueryClientProvider>
        </ThemeWrapper>
      </ThemeContext>
    );
  }
}
