import './Main.css';

import React, { useState } from "react";


const Main = () => {
  const [showResults, setShowResults] = useState(false)
  const [wikiData, setwikiData] = useState(null)
  const [error, setError] = useState(false)



  let inputHandler = (e) => {
    if (e.key === "Enter") {

      const getData = async () => {
        try {
          const response = await fetch(
            `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exsentences=1&exlimit=1&titles=${e.target.value}&explaintext=1&formatversion=2&origin=*`
          );
          if (!response.ok) {
            throw new Error(
              `${response.status}`
            );
          }
          console.log(response)

          let actualData = await response.json();
          setwikiData(actualData.query.pages[0].extract);
        } catch (err) {
          setError(true);
        }
      }
      getData()
      setShowResults(true)

    }
  };

  const Results = () => (

    <div id="results" className="search-results">
      {error && <p>An error occurred while trying to connect to Wikipedia.</p>}

      {wikiData}
    </div>
  )

  return (
    <div className="main">
      <a class="changelang" href="es" rel="noreferrer">ES</a>
      <a class="separate">/</a>
      <a class="selected">EN</a>
      <h1>Shortestpedia - English</h1>
      <div className="search">
        <input
          placeholder='Search'
          onKeyPress={inputHandler}

        />
      </div>

      {showResults ? <Results /> : null}
      <h6>v0.2 (user)</h6>
      <a href="https://wikipedia.org/" rel="noreferrer" target="_blank">Wikipedia</a>
      <a href="https://mediawiki.org/wiki/API:Main_page" rel="noreferrer" target="_blank">Wikipedia API</a>
      <a href="https://github.com/itroeix/shortestpedia" rel="noreferrer" target="_blank">Github</a>
    </div>

  )
}
export default Main;