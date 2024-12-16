import React, { useState, useEffect } from 'react';
import './HighlightedTitle.css';
import { Link } from 'react-router-dom';

function HighlightedTitle({ data, onMouseEnter, onMouseLeave }) {

  return (
    <div className="App">
      <h1 className='display-4'>Trending Now</h1>
      <div className="highlight">
        {data
          .filter((m) => m.type === 'movie')
          .filter((m) => m.poster && m.primaryTitle && !m.primaryTitle.includes('Episode #'))
          .map((m, i) => (
            <div key={i} className="highlight-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {m.poster && <img src={m.poster} alt={m.title} />}
              <div className="overlay">
                <Link to={`/Title/${m.tconst}`}><h3>{m.primaryTitle}</h3></Link>
                <span>
                  {m.startDate && <p>Aired:{m.startDate}</p>} {m.genres && <p>Genre: {m.genres}</p>}
                </span>
                  {/* <p>{m.plot && m.plot.length < 500 && m.plot}</p> */}
                  <p className='text-long'>{m.plot}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HighlightedTitle;
