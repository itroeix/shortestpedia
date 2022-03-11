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
                        `https://es.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exsentences=1&exlimit=1&titles=${e.target.value}&explaintext=1&formatversion=2&origin=*`
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
            {error && <p>Se produjo un error al intentar conectarse a Wikipedia.</p>}

            {wikiData}
        </div>
    )

    return (
        <div className="main">
            <h1>Shortestpedia - Español</h1>
            <div className="search">
                <input
                    placeholder='Buscar'
                    onKeyPress={inputHandler}

                />
            </div>

            {showResults ? <Results /> : null}
            <h6>v0.1 (user)</h6>
            <a href="https://wikipedia.org/" rel="noreferrer" target="_blank">Wikipedia</a>
            <a href="https://mediawiki.org/wiki/API:Main_page/es" rel="noreferrer" target="_blank">Wikipedia API</a>
            <a href="https://github.com/itroeix/shortestpedia" rel="noreferrer" target="_blank">Github</a>

        </div>

    )
}
export default Main;