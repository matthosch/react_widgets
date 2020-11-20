import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import googleTranslate from "../apis/googleTranslate";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await googleTranslate.post(
        "",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
