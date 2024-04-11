import * as Font from "expo-font";

const fontDefinitions = {
  black: require("../assets/fonts/Roboto-Black.ttf"),
  blackItalic: require("../assets/fonts/Roboto-BlackItalic.ttf"),
  bold: require("../assets/fonts/Roboto-Bold.ttf"),
  boldItalic: require("../assets/fonts/Roboto-BoldItalic.ttf"),
  italic: require("../assets/fonts/Roboto-Italic.ttf"),
  light: require("../assets/fonts/Roboto-Light.ttf"),
  lightItalic: require("../assets/fonts/Roboto-LightItalic.ttf"),
  medium: require("../assets/fonts/Roboto-Medium.ttf"),
  mediumItalic: require("../assets/fonts/Roboto-MediumItalic.ttf"),
  regular: require("../assets/fonts/Roboto-Regular.ttf"),
  thin: require("../assets/fonts/Roboto-Thin.ttf"),
  thinItalic: require("../assets/fonts/Roboto-ThinItalic.ttf"),
};

export default async function loadFonts() {
  try {
    await Font.loadAsync(fontDefinitions);
    return true;
  } catch (error) {
    console.error("Error loading fonts:", error);
    return false;
  }
}
