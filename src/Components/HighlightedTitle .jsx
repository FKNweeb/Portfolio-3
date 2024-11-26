import React, { useState, useEffect } from "react";

function HighlightedTitle({ data, onMouseEnter, onMouseLeave }) {
    // const imagePath = 'https://image.tmdb.org/t/p/w1280'

    return (
    <div className="App">
      <h1>Trending Now</h1>
      <div className="highlight">
        {data.map((m, i) => (
          <div key={i} className="highlight-item" 
                          onMouseEnter={onMouseEnter} 
                          onMouseLeave={onMouseLeave}>
             <img src={m.poster} alt={m.title} />
            <h3>{m.primaryTitle}</h3>
          </div>
        ))}
        </div>
        </div>
   
  );
}

export default HighlightedTitle;
