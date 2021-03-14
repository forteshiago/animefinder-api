import React, { useEffect, useState } from "react";

import SearchInput from "./SearchInput";
import "./styles.css";

const API_URL_BASE = 'https://kitsu.io/api/edge/';

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    setInfo({});
    if (text) {
      console.log(text);
        fetch(`${API_URL_BASE}anime?filter[text]=${text}`) /*&page[limit]=12 eh para a paginacao*/
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
          //console.log(response);
        });
    }
  }, [text]);

  return (
    <div className="App" >
      <h1>Hello World</h1>
      <SearchInput value={text} onChange={(mysearch) => setText(mysearch)} />

      {text && !info.data && (
        <span>Carregando...</span>
      )}

      {info.data && (
        <ul className="animes-list" >
          {info.data.map((anime) => (
            <li key={anime.id} >
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}



    </div>
  );
}

export default App;
