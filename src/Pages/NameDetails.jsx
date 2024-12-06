import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import './NameDetails.css';
import KnownWorks from '../Components/KnownWorks';
import CoPlayers from '../Components/CoPlayers.jsx';
import RateName from '../Components/RateName.jsx';
import BookmarkName from '../Components/BookmarkName.jsx';

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
    <div className='container-fluid'>
      <div className='container text-center bg-light p-4 rounded shadow-sm'>
           <div className='row row-cols-2'>
           <div  id ="title-poster" className='col1'>
              {image ? (<img src={image} alt={`${name.name}`} className="img-fluid  mb-2" />
                   ) :  (<div className='image-placeholder'>No image available</div>)}
           </div>
           <div id="title-information" className='col2' >
             <div className='col'>
               <div id="title" className='row1'>
                   <h2 className='mb-3'>{name.name}</h2>
               </div>
               <div id='date-rating' className='row2 row-cols-3 d-flex flex-wrap mb-3 bg-light p-4 rounded-1 shadow-lg mb-3'>
                <h5 className='col1' style={name.birthYear ? null : {visibility: 'hidden' }}>Birth year: {name.birthYear}</h5>
                {<h5 className='col2' style={name.deathYear ? null : {visibility: 'hidden' }}>Death year: {name.deathYear}</h5>}
                <div>
                  <h5 className=' col3' style={name?.localNameRatings?.averageRating ? null : {visibility: 'hidden' }}>
                    Rating: {name?.localNameRatings?.averageRating}
                  </h5>
                  <p style={name?.localNameRatings?.totalVotes ? null : { visibility: 'hidden' }}>
                    Number of votes: {name?.localNameRatings?.totalVotes}
                  </p>
                </div>
               </div>
               <div className='row3 bg-light p-4 rounded-1 shadow-lg mb-3'>
                 {name.professions.map((prof) => 
                  <p className='text-secondary fs-5 mb-0'>{prof}</p>)}
               </div>
             </div>
           </div>
         </div>


         <div id="buttons" className='row row-cols-2 mt-3 mb-3'>
           <div className=''>
             <div className='row-col-2 '>
             <BookmarkName slug={slug} />
             <RateName slug={slug} />
             </div>
           </div>
         </div>
      </div>
      
      <div id="knownWorks" className='row'>
        <KnownWorks knownForTitles={name.knownForTitles}/>
      </div>
      <div id="coPlayers" className='row'>
        <CoPlayers />
      </div>
    </div>
    
  );
}

export default NameDetails;
