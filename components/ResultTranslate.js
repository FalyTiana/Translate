import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCallback } from "react";
import * as ClipBoard from "expo-clipboard";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import SpeechSpeak from "./SpeechSpeak";

export default function ResultTranslate({result, to}) {
    
    const copyToClipboard = useCallback(async () => {
        await ClipBoard.setStringAsync(result);
      }, [result]);
    return (
    <View style={styles.container}>
      <Text style={styles.text}>{result}</Text>

      <TouchableOpacity
        onPress={copyToClipboard}
        disabled={result.trim() === ""}
        style={styles.iconContainer}
      >
        <MaterialIcons
          name="content-copy"
          size={24}
          color={
            result.trim() !== "" ? colors.textColor : colors.textColorDisabled
          }
        />
      </TouchableOpacity>
      <SpeechSpeak text={result} code={to.code}/>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flexDirection: "row",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    height: 125,
    paddingVertical: 20,
    position:'relative',
    paddingBottom: 25
  },
    text: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    color: colors.primary,
    flex: 1,
    marginHorizontal: 20,
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
