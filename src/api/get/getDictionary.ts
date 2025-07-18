import { DictionaryResponse } from "@/Interfaces/Request";
import axios from "axios";

export const getDictionaryAll = async (text: string) => {
  const resp = await axios.get<DictionaryResponse[]>(
    ` https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
  );
  if (resp.status !== 200) {
    throw new Error("Failed to fetch dictionary data");
  }

  if (resp) {
    return resp.data;
  }
};
