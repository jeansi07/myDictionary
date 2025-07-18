"use client";

import { getDictionaryAll } from "@/api/get";
import { Divider, InputSearch } from "@/components";
import { DictionaryResponse } from "@/Interfaces/Request";
import { PlayIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const ThemeToggle = dynamic(
  () => import("@/components/ThemeToggle/ThemeToggle"),
  {
    ssr: false,
  }
);
const SelectType = dynamic(() => import("@/components/SelectType/SelectType"), {
  ssr: false,
});

export default function Home() {
  const [search, setSearch] = useState("");
  const [word, setWord] = useState<DictionaryResponse | undefined>(undefined);

  const firstPhonetic = word?.phonetics?.find((p) => p.text);
  const firstAudio = word?.phonetics?.find((p) => p.audio);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const getData = async () => {
    try {
      const response = await getDictionaryAll(search);
      console.log("dictionary", response);
      setWord(response?.at(0));
    } catch (error) {
      setWord(undefined);
    }
  };

  useEffect(() => {
    if (search) {
      getData();
    } else {
      setWord(undefined);
    }
  }, [search]);

  return (
    <div className="lg:flex lg:flex-col lg:py-10 lg:px-72 px-5 py-2 flex flex-col gap-6 h-full">
      <div className="flex justify-end gap-2">
        <SelectType />
        <ThemeToggle />
      </div>

      <InputSearch className="w-full" onChange={setSearch} value={search} />
      {!search && (
        <p className="text-gray-500 text-center mt-4">Enter a word to search</p>
      )}

      {search && word === undefined && (
        <p className="text-red-500 text-center mt-4">
          No word found <strong>"{search}"</strong>.
        </p>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-7xl">{search}</h1>
          {firstPhonetic?.text && (
            <p className="text-lg">
              <span className="font-semibold, text-purple-700">
                {firstPhonetic.text}
              </span>
            </p>
          )}
        </div>

        <div className="mb-4">
          {firstAudio?.audio && (
            <>
              <button
                onClick={handlePlay}
                className="flex justify-center items-center bg-purple-300 w-15 h-15 hover:bg-purple-300 hover:cursor-pointer text-white p-2 rounded-full"
                aria-label="Play pronunciation"
              >
                <PlayIcon className="h-5 w-5 text-purple-800" />
              </button>

              <audio ref={audioRef} src={firstAudio.audio} />
            </>
          )}
        </div>
      </div>

      <div>
        <ul className="list-disc list-inside text-gray-500 dark:text-white gap-2">
          {word?.meanings.map((meaning, meaningIndex) => (
            <div className="flex flex-col gap-3" key={meaningIndex}>
              <p className="mt-2">Meaning</p>
              <div className="flex items-center gap-2">
                <h3 className="font-bold capitalize">{meaning.partOfSpeech}</h3>
                <Divider />
              </div>

              <ul className="list-disc list-inside">
                {meaning.definitions.map((def, defIndex) => (
                  <li key={defIndex}>{def.definition}</li>
                ))}
              </ul>

              {meaning.synonyms.length > 0 && (
                <div className="mb-1">
                  <span className="font-semibold">Synonyms: </span>
                  {meaning.synonyms.map((syn, synIndex) => (
                    <span key={synIndex} className="text-purple-400">
                      {syn}
                      {synIndex < meaning.synonyms.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
