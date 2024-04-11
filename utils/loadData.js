import AsyncStorage from "@react-native-async-storage/async-storage";
import { setHistoryItems } from "../store/historySlice";
import { setSavedItems } from "../store/savedItemsSlice";

export default loadData = () => {
    return async (dispatch) => {
      try {
        const historyString = await AsyncStorage.getItem("history");
        if (historyString !== null) {
          const history = JSON.parse(historyString);
          dispatch(setHistoryItems({ items: history }));
        }
        const savedItemsString = await AsyncStorage.getItem("savedItems");
        if (savedItemsString !== null) {
          const savedItems = JSON.parse(savedItemsString);
          dispatch(setSavedItems({ items: savedItems }));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };