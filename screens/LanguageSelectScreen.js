import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
import LanguageItem from "../components/LanguageItem";
import loadSupportedLanguages from "../utils/loadSupportedLanguages";

export default function LanguageSelectScreen({ navigation, route }) {
  const params = route.params || {};
  const { title, selected } = params;

  const [supportedLanguage, setSupportedLanguage] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" color={colors.textColor} size={25} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadSupportedLanguages(setSupportedLanguage);
  }, []);
  const onLanguageSelect = useCallback(
    (itemKey) => {
      const dataKey = params.mode === "to" ? "languageTo" : "languageFrom";
      navigation.navigate("Home", { [dataKey]: itemKey });
    },
    [params, navigation]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={supportedLanguage}
        renderItem={( {index, item} ) => {
          if (
            params.mode === "to" &&
            item.code === "auto"
          ) {
            return null;
          } else {
            return (
              <LanguageItem
                key={index}
                onPress={() => onLanguageSelect(item)}
                text={item.language}
                selected={item.code === selected}
              />
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
