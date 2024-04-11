import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
import { useDispatch} from "react-redux";
import loadTranslateText from "../utils/loadTranslateText";
import SpeechSpeak from "./SpeechSpeak";

export default function TextInputTranslate({
  from,
  setFrom,
  to,
  text,
  setText,
  setResult,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = useCallback(async () => {
    await loadTranslateText(text , setResult, from, setFrom, to, dispatch , setIsLoading)
  }, [from, to, text]);
  return (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder="Enter text"
        style={styles.textInput}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity
        onPress={isLoading ? undefined : onSubmit}
        disabled={text.trim() === ""}
        style={styles.iconContainer}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color={colors.primary} />
        ) : (
          <Ionicons
            name="arrow-forward-circle-sharp"
            size={24}
            color={text.trim() !== "" ? colors.primary : colors.primaryDisabled}
          />
        )}
      </TouchableOpacity>
      <SpeechSpeak text={from.code=="auto"?"": text} code={from.code}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: "row",
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 25
  },
  textInput: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily: "regular",
    letterSpacing: 0.3,
    height: 100,
    color: colors.textColor,
    textAlignVertical: "top",
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
