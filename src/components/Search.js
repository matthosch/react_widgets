import React, { useState, useEffect } from "react";
import dompurify from "dompurify";
import useDebounce from "../utils/useDebounce";
import wikipedia from "../apis/wikipedia";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const debouncedTerm = useDebounce(term, 500);

  useEffect(() => {
    const search = async () => {
      const { data } = await wikipedia.get("", {
        params: {
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };

    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="content">
          <div className="right floated content">
            <a
              className="ui button"
              href={`https://en.wikipedia.org?curid=${result.pageid}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Go
            </a>
          </div>
          <div className="header">{result.title}</div>
          <span
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(result.snippet),
            }}
          ></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            type="text"
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
