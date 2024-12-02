import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';

function NameDetails() {
  const { slug } = useParams();
  const [name, setName] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const nameData = await fetch(`http://localhost:5001/api/names/${slug}`);

        const data = await nameData.json();
        setName(data.items);
      } catch (error) {
        console.log('Failed to fetch name', error);
      }
    };
    if (slug) fetchName();
  }, [slug]);

 
  if (!name.length) {
    return <h1>Not Found</h1>;
  }

  return (
    <div>
      {name.map((n) => (
        <div className="personcontainer" key={n.nconst}>
          <h1>
            {n.name} <br />
            Born in {n.birthYear} <br />
            {n.deathYear !== null && n.deathYear !== '' && n.deathYear} <br />
            Known For Titles:
            <ul>
              {n.knownForTitles?.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
            Professions:
            <ul>
              {n.professions?.map((prof) => (
                <li key={prof}>{prof}</li>
              ))}
            </ul>
          </h1>
        </div>
      ))}
    </div>
  );
}

export default NameDetails;
