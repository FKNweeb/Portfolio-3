import React, { useState } from "react";
import useTitlesStore from "../Stores/TitlesStore";
import './SearchResult.css'
import useNamesStore from "../Stores/NamesStore";
function SearchResult() {
    
    const {titles} = useTitlesStore();
    const {names} = useNamesStore();

    console.log(titles);
    console.log(names);

    return (
        <div className="container">
            <div className="row row-cols-2 gx-5">
                <div className="col1">
                    <h2 className="">Search Result Page</h2>

                    <h5 className="">People</h5>
                    <div id="Person" className="row justify-content-start mb-4">
                        {names.slice(0,3).map( n => (
                        <div key={n.nconst} className="mb-1 col-12">
                            <div className="card w-100">
                                <div className="card-body shadow-lg d-flex flex-column">
                                    <div className="d-flex flex-column flex-md-row justify-content-between">
                                    <h5 className="card-title">{n.name}</h5>
                                    <p className="fst-italic">{n.birthYear && <p>Birth year:{n.birthYear}</p> }</p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between mb-3">
                                    <div>
                                        Profession:{n.professions.map(p => (<span className="p-1 fst-italic">{p}</span>))}
                                    </div>
                                    <div>
                                        {n.knownForTitles && n.knownForTitles.length > 0 && (
                                            <div>
                                                Titles:{n.knownForTitles.map( t => (<span className="p-1 fst-bold">{t}</span>))}
                                            </div>
                                        )}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                        <div id="buttons" className="row d-flex">
                            <div className="col-12 d-flex flex-column flex-md-row justify-content-center  mb-3 p-2">
                                <button className="btn btn-outline-primary w-25 mx-2 w-md-25 text-truncate">Previous</button>
                                <button className="btn btn-outline-primary w-25 mx-2 w-md-25 text-truncate">Next</button>
                            </div>
                        </div>

                    <h5 className="">Titles</h5>
                    <div id="Titles" className="row justify-content-start mb-4">
                        {titles.slice(0, 3).map( t=> (
                        <div key={t.tconst} className="mb-1">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h5>{t.primaryTitle}</h5>
                                    <p className="text-long">{t.plot}</p>
                                </div>
                            </div>
                        </div>
                        )
                        )}
                    </div>
                        <div id="buttons" className="row d-flex">
                            
                                <div className="row justify-content-center mb-3 p-2">
                                    <button className="w-25">Previous</button>
                                    <button className="w-25">Next</button>
                                </div>

                        </div>
                </div>

                <div className="col2">
                    <h2>Advanced Search</h2>
                    <h5 className="mb-3">Structured String Search</h5>
                    <input type="text" placeholder="Smth"></input>
                    <h5 className="mb-3">Structured String Search</h5>
                    <input type="text" placeholder="Smth"></input>
                    <h5 className="mb-3">Structured String Search</h5>
                    <input type="text" placeholder="Smth"></input>
                    <h5 className="mb-3">Structured String Search</h5>
                    <input type="text" placeholder="Smth"></input>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
