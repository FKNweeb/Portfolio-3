import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch, setSearchText } from '../Helpers/SearchContext';
import { ListGroup } from 'react-bootstrap';

function Search() {
  const { searchText, setSearchText } = useSearch();

  const [titles, setTitles] = useState([]);
  const titleUrl = 'http://localhost:5001/api/titles/search?keywords=';

  const [names, setNames] = useState([]);
  const namesUrl = 'http://localhost:5001/api/names/';

  const navigate = useNavigate();

  const handleTitleClick = (slug) => {
    setSearchText('');
    navigate(`/Title/${slug}`);
  };

  const handleNameClick = (slug) => {
    setSearchText('');
    navigate(`/Name/${slug}`);
  };

  useEffect(() => {
    fetch(titleUrl + searchText)
      .then((res) => res.json())
      .then((data) => setTitles(data.items))
      .catch((err) => console.log(err));
  }, [searchText]);

  useEffect(() => {
    fetch(namesUrl + encodeURIComponent(searchText))
      .then((res) => res.json())
      .then((data) => setNames(data.items))
      .catch((err) => console.log(err));
  }, [searchText]);

  return (
    <div className="search-list w-50">
      <div>
        <ListGroup className="text-center container-fluid">
          {searchText &&
            titles.slice(0, 3).map((t) => (
              <ListGroup.Item key={t.tconst} onClick={() => handleTitleClick(t.primaryTitle)}>
                {t.primaryTitle}
              </ListGroup.Item>
            ))}
        </ListGroup>
        <ListGroup className="text-center container-fluid">
          {searchText &&
            names.slice(0, 3).map((n) => (
              <ListGroup.Item key={n.nconst} onClick={() => handleNameClick(n.name)}>
                {n.name}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Search;
