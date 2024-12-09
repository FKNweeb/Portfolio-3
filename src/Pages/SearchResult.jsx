import React, { useState } from "react";
import useTitlesStore from "../Stores/TitlesStore";
import './SearchResult.css'
import useNamesStore from "../Stores/NamesStore";
import BestMatch from "../Components/BestMatch";
import ExactMatch from "../Components/ExactMatch";
import StructuredtMatch from "../Components/StructuredMatch";
import StructuredNametMatch from "../Components/StructuredNameMatch";
function SearchResult() {
    
    const {titles} = useTitlesStore();
    const {names} = useNamesStore();

    console.log(titles);
    console.log(names);

    const [currentPageName, setCurrentPageName] = useState(1);
    const [currentPageTitle, setCurrentPageTitle] = useState(1);

    const handleNextName = () =>{
        setCurrentPageName(currentPage => currentPage + 1)
    }

    const handlePrevName = () => {
        setCurrentPageName( currentPage => currentPage -1)
    }

    const handleNextTitle = () =>{
        setCurrentPageTitle(currentPage => currentPage + 1)
    }

    const handlePrevTitle = () => {
        setCurrentPageTitle( currentPage => currentPage -1)
    }

    const indexLastItem = currentPageName * 3;
    const indexOfFirstItem = indexLastItem - 3;
    const currNames = names.slice(indexOfFirstItem, indexLastItem);

    const indexLastItemTitle = currentPageTitle * 3;
    const indexOfFirstItemTitle = indexLastItemTitle - 3;
    const currTitles = titles.slice(indexOfFirstItemTitle, indexLastItemTitle);

    const totalPagesName = Math.ceil(names.length / 3);
    const totalPagesTitle = Math.ceil(titles.length / 3);
    return (
        <div className="container">
            <div className="row row-cols-2 gx-5">
                <div className="col1">
                    <h2 className="">Search Result Page</h2>

                    <h5 className="">People</h5>
                    <div id="Person" className="row justify-content-start mb-4">
                        {currNames.map( n => (
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
                                                Titles:{n.knownForTitles.map( t => (<span className="p-1 fst-bold">"{t}"</span>))}
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
                                <button className="btn btn-outline-primary w-25 mx-2 w-md-25 text-truncate" onClick={handlePrevName} disabled={currentPageName === 1}>Previous{console.log(currentPageTitle)}</button>
                                <button className="btn btn-outline-primary w-25 mx-2 w-md-25 text-truncate" onClick={handleNextName} disabled={currentPageName === totalPagesName}>Next</button>
                            </div>
                        </div>

                    <h5 className="">Titles</h5>
                    <div id="Titles" className="row justify-content-start mb-4">
                        {currTitles.map( t=> (
                        <div key={t.tconst} className="mb-1 col-12">
                            <div className="card w-100">
                                <div className="card-body shadow-lg d-flex flex-column">
                                    <div className="d-flex flex-column flex-md-row justify-content-between">
                                        <h5 className="card-title mb-0">{t.primaryTitle}</h5>
                                        <p className="fst-italic">{t.startDate && <p>Aired: {t.startDate}</p>}</p>
                                    </div>
                                    <div className="mb-1">
                                        {t.genres && t.genres.length > 0 && !t.genres.every(g => g===null) && (
                                            <div>
                                                Genre: {t.genres.map( g => (<span className="p-1 fst-bold">{g}</span>))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        Type:{<span className="fst-italic p-1">{t.type}</span>}
                                    </div>
                                    <div className="mb-1">     
                                        {t.languages && t.languages.length > 0 && !t.languages.every(l => l === null) && (
                                            <div>
                                                Lang: {t.languages.filter((e, i, self) => i === self.indexOf(e)).map( l => (<span className="p-1 fst bold">{l}</span>))}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-long">{t.plot}</p>
                                </div>
                            </div>
                        </div>
                        )
                        )}
                    </div>
                        <div id="buttons" className="row d-flex">
                            <div className="col-12 d-flex flex-column flex-md-row justify-content-center  mb-3 p-2">
                                <button className="btn btn-outline-primary w-25 mx-2 w-md-25 text-truncate" onClick={handlePrevTitle} disabled={currentPageTitle === 1}>Previous</button>
                                <button className="btn btn-outline-primary w-25 mx-2 w-md-25 text-truncate" onClick={handleNextTitle} disabled={currentPageTitle === totalPagesTitle}>Next</button> 
                            </div>

                        </div>
                </div>

                <div className="col2">
                    <h2 className="mb-3">Advanced Search</h2>
                    <BestMatch/>
                    <ExactMatch/>
                    <StructuredtMatch/>
                    <StructuredNametMatch/>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
