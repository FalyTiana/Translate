import axios from "axios";
import { baseUrl, headers } from "./constant";

delete headers["content-type"];

export default supportedLanguages = async () => {
  const options = {
    method: "GET",
    url: `${baseUrl}/support-languages`,
    headers: headers,
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200){
        return response.data;
    }else{
        throw new Error(`Erreur de l'API: Statut ${response.status}`);
    }
  } catch (error) {
    throw error
  }
};
