import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch, setSearchText } from '../Helpers/SearchContext';
import { ListGroup } from 'react-bootstrap';
import useTitlesStore from '../Stores/TitlesStore';
import useNamesStore from '../Stores/NamesStore';

function Search() {
  const {titlesFetched} = useTitlesStore();
  const {namesFetched} = useNamesStore();

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

      titlesFetched(titles);
  }, [searchText]);

  useEffect(() => {
    fetch(namesUrl + encodeURIComponent(searchText))
      .then((res) => res.json())
      .then((data) => setNames(data.items))
      .catch((err) => console.log(err));

      namesFetched(names);
  }, [searchText]);

  return (
    <div className="search-list">
      <div>
        <ListGroup className="text-center container-fluid p-0">
          {searchText &&
            titles.slice(0, 3).map((t) => (
              <ListGroup.Item key={t.tconst} onClick={() => handleTitleClick(t.primaryTitle)}>
                {t.primaryTitle}
              </ListGroup.Item>
            ))}
        </ListGroup>
        <ListGroup className="text-center container-fluid p-0">
          {searchText &&
            names.slice(0, 3).map((n) => (
              <ListGroup.Item key={n.nconst} onClick={() => handleNameClick(n.nameId)}>
                {n.name}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default Search;
