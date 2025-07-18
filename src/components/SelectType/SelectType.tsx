"use client";

import { ChangeEvent, useEffect, useState } from "react";

export const SelectType: React.FC = () => {
  const fonts = [
    { label: "monospace", value: "monospace" },
    { label: "san serif", value: "san-serif" },
    { label: "serif", value: "serif" },
  ];
  const [selectFont, setSelectFont] = useState(fonts[0].value);

  const changeSelectFonts = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectFont(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("font", selectFont.toString());
    document.documentElement.setAttribute("data-font", selectFont);
  }, [selectFont]);

  return (
    <select
      value={selectFont}
      onChange={changeSelectFonts}
      className="p-2 rounded-full flex w-36 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      aria-label="Toggle theme"
    >
      {fonts.map((font) => (
        <option key={font.value} value={font.value}>
          {font.label}
        </option>
      ))}
    </select>
  );
};

export default SelectType;
