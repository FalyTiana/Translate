import axios from "axios";
import { baseUrl, headers } from "./constant";

export default async (from, to, text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("from", from);
  encodedParams.set("to", to);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: `${baseUrl}/text`,
    headers: headers,
    data: encodedParams,
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
