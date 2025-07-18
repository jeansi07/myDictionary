export interface DictionaryResponse {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

export interface Definition {
  definition: string;
  example: string;
  synonyms: any[];
  antonyms: any[];
}

export interface Phonetic {
  text: string;
  audio?: string;
}
