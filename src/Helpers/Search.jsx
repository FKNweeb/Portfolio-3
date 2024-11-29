import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [titles, setTitles] = useState([]);

  const titleUrl = 'http://localhost:5001/api/titles/search?keywords=';

  const navigate = useNavigate();

  const handleTitleClick = (id) => {
    navigate(`/title/${id}`);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  useEffect(() => {
    fetch(titleUrl + searchTerm, options)
      .then((res) => res.json())
      .then((data) => setTitles(data.items))
      .console((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <input type="text" placeholder="Search Titles or Persons" value={searchTerm} onChange={handleChange} />
      <div>
        {searchTerm &&
          titles.slice(0, 3).map((t) => (
            <div key={t.tconst}>
              <h4>{t.primaryTitle}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
