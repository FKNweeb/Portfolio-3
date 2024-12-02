import React, { useState, useEffect } from 'react';
import './HighlightedTitle.css';

function HighlightedTitle({ data, onMouseEnter, onMouseLeave }) {
  // const imagePath = 'https://image.tmdb.org/t/p/w1280'

  return (
    <div className="App">
      <h1>Trending Now</h1>
      <div className="highlight">
        {data
          .filter((m) => m.type === 'movie')
          .filter((m) => m.poster && m.primaryTitle && !m.primaryTitle.includes('Episode #'))
          .map((m, i) => (
            <div key={i} className="highlight-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {m.poster && <img src={m.poster} alt={m.title} />}
              <div className="overlay">
                <h3>{m.primaryTitle}</h3>
                <span>
                  Aired:{m.startDate} Genre: {m.genres}
                </span>
                <p>{m.plot && m.plot.length < 500 && m.plot}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HighlightedTitle;
