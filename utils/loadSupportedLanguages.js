import AsyncStorage from "@react-native-async-storage/async-storage";
import supportedLanguages from "../api/supportedLanguages";
import { Alert, BackHandler } from "react-native";

const storeSupportedLanguages = async (languages, setSupportedLanguage) => {
    try {
      await AsyncStorage.setItem(
        "supportedLanguages",
        JSON.stringify(languages)
      );
      setSupportedLanguage(languages);
    } catch (e) {
      console.error(
        "Failed to store supported languages in AsyncStorage:",
        e
      );
    }
  };

  const fetchSupportedLanguages = async (setSupportedLanguage) => {
    try {
      const languages = await supportedLanguages();
      await storeSupportedLanguages(languages, setSupportedLanguage);
    } catch (error) {
      Alert.alert(
        "Language Recovery Error",
        error.message,
        [{ text: "OK", onPress: () => BackHandler.exitApp() }],
        { cancelable: false }
      );
    }
  };

  export default loadSupportedLanguages = async (setSupportedLanguage) => {
    try {
      const storedSupportedLanguages = await AsyncStorage.getItem(
        "supportedLanguages"
      );
      if (storedSupportedLanguages !== null) {
        setSupportedLanguage(JSON.parse(storedSupportedLanguages));
      } else {
        await fetchSupportedLanguages(setSupportedLanguage);
      }
    } catch (e) {
      console.error(
        "Failed to load supported languages from AsyncStorage:",
        e
      );
    }
  };