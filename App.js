import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import fonts from "./config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { Provider } from "react-redux";
import store from "./store/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        const isLoadFonts = await fonts();
        setAppIsLoaded(isLoadFonts);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }
    loadFonts();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <View onLayout={onLayout} style={{ flex: 1 }}>
          <StackNavigator />
        </View>
      </NavigationContainer>
    </Provider>
  );
};
