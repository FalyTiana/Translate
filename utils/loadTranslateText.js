import translateText from "../api/translateText";
import uuid from "react-native-uuid"
import { addHistoryItem } from "../store/historySlice";

 export default async function loadTranslateText(text, setResult, from, setFrom, to, dispatch, setIsLoading) {
    try {
        setIsLoading(true);
        const resultAPI = await translateText(from.code, to.code, text);
        const trans = resultAPI.trans;
        if (!trans) {
          setResult("");
          return;
        }
        setResult(trans);
        if (from.code == "auto") {
          setFrom({
            code: resultAPI.source_language_code,
            language: resultAPI.source_language,
          });
        }
        const id = uuid.v4();
        const dataTime = new Date().toISOString();
        const result = trans
  
        dispatch(
          addHistoryItem({
            item: {
              id,
              dataTime,
              text,
              result,
              from,
              to,
            },
          })
        );
      } catch (error) {
        Alert.alert(
          "error",
          `There is a problem during the translation, please try again.(error : ${error})`
        );
        setResult("");
      } finally {
        setIsLoading(false);
      }
}