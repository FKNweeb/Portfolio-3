import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './NameDetails.css';

function NameDetails() {
  const { slug } = useParams();
  const [name, setName] = useState({});
  const [person, setPerson] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const nameData = await fetch(`http://localhost:5001/api/names/name/${slug}`);
        const data = await nameData.json();
        setName(data);
      } catch (error) {
        console.error('Failed to fetch name', error);
      }
    };
    if (slug) fetchName();
  }, [slug]);

  useEffect(() => {
    const fetchPerson = async () => {
      if (!name.name) return;
      const baseUrl = "https://api.themoviedb.org/3/search/person?query=";
      const apiKey = "&api_key=9b7b63dc32674b6a775fbc61bf528ccb";

      try {
        const response = await fetch(baseUrl + name.name + apiKey);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setPerson(data.results[0]);
        } else {
          console.error("No persons found for the query.");
        }
      } catch (error) {
        console.error("Failed to fetch persons", error);
      }
    };
    fetchPerson();
  }, [name.name]);

  useEffect(() => {
    const fetchPersonImage = async () => {
      if (!person || !person.id) return;

      const apiKey = "9b7b63dc32674b6a775fbc61bf528ccb";
      const baseUrl = "https://image.tmdb.org/t/p/";
      const fileSize = "w200";

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${person.id}/images?api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.profiles && data.profiles.length > 0) {
          const imagePath = `${baseUrl}${fileSize}${data.profiles[0].file_path}`;
          setImage(imagePath);
        } else {
          console.error("No profiles found for the person.");
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchPersonImage();
  }, [person.id]);

  if (!name.name) {
    return <h1>Not Found</h1>;
  }

  return (
    <div>
      <div className="header">
        <h1>{name.name}</h1>
        <h1 className="biography">Biography</h1>
      </div>

      <div className="content">
        <div className='image-section'>
          {image ? (<img src={image} alt={`${name.name}`} className="profile-image" />
              ) :  (<div className='image-placeholder'>No image available</div>)}
          <div className="button-group">
            <button className="button">Bookmark</button>
            <button className="button">Rate</button>
          </div>
        </div>

        <div className="details">
          {name.birthYear && <p>Birth year: {name.birthYear}</p>}
          {name.deathYear && <p>Death year: {name.deathYear}</p>}
          {name.knownForTitles && (
            <>
              <p>Known for titles:</p>
              <ul>
                {name.knownForTitles.map((title, index) => (
                  <li key={index}>{title}</li> 
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NameDetails;
