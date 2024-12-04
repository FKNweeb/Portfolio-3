import React from "react";

function SearchResult() {
    return (
        <div className="container">
            <div className="row row-cols-2 gx-5">
                <div className="col1">
                    <h2 className="">Search Result Page</h2>

                    <h5 className="">People</h5>
                    <div id="Person" className="row justify-content-start mb-4">
                        <div className="mb-1">
                            <div className="card w-100">
                                <div className="card-body">
                                    Person
                                </div>
                            </div>
                        </div>
                    </div>
                        <div id="buttons" className="row d-flex">
                            <div className="row justify-content-center mb-3 p-2">
                                <button className="w-25">Previous</button>
                                <button className="w-25">Next</button>
                            </div>
                        </div>

                    <h5 className="">Titles</h5>
                    <div id="Titles" className="row justify-content-start mb-4">
                        <div className="mb-1">
                            <div className="card w-100">
                                <div className="card-body">
                                    Title
                                </div>
                            </div>
                        </div>
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
