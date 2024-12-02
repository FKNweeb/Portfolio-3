import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../Components/Search';

function TitleDetails() {
  const { slug } = useParams();

  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/titles/search?keywords=${slug}`)
      .then((res) => res.json())
      .then((data) => setTitle(data.items))
      .catch((err) => console.log(err));
  }, [slug]);

  if (!title.length) return <p>No page Found</p>;

  return (
    <div>
      <Search />
      <div>
        {title.map((t) => (
          <div>
            <p>{t.primaryTitle}</p>
            <p>{t.plot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TitleDetails;
