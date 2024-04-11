import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import LanguageSourceTarget from "../components/LanguageSourceTarget";
import TextInputTranslate from "../components/TextInputTranslate";
import ResultTranslate from "../components/ResultTranslate";
import History from "../components/History";
import LoadData from "../utils/loadData";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen(props) {
  const params = props.route.params || {};
  const history = useSelector((state) => state.history.items); 
  const dispatch = useDispatch();
  const [from, setFrom] = useState({ code: "auto", language: "Automatic" });
  const [to, setTo] = useState({ code: "en", language: "English" });
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const switchLanguages = (newFrom, newTo) => {
    setFrom(newFrom);
    setTo(newTo);
    const newText = result;
    setResult(text);
    setText(newText);
  };

  useEffect(() => {
    if (params.languageTo) {
      if (params.languageTo.code === from.code) {
        switchLanguages(to, params.languageTo);
      } else {
        setTo(params.languageTo);
      }
    }
    if (params.languageFrom) {
      if (params.languageFrom.code === to.code) {
        switchLanguages(params.languageFrom, from);
      } else {
        setFrom(params.languageFrom);
      }
    }
  }, [params.languageTo, params.languageFrom]);

  useEffect(() => {
    dispatch(LoadData());
  }, [dispatch]);
  
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem("history", JSON.stringify(history));
      } catch (error) {
        console.log(error);
      }
    };   
    saveHistory();
  }, [history]);
  return (
    <View style={styles.container}>
      <LanguageSourceTarget
        from={from}
        to={to}
        switchLanguages={switchLanguages}
        props={props}
      />

      <TextInputTranslate
        from={from}
        setFrom={setFrom}
        to={to}
        text={text}
        setText={setText}
        setResult={setResult}
      />

      <ResultTranslate result={result} to={to}/>
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
