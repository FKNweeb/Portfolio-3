import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SimilarTitles from '../Components/SimilarTitles';
import ActorsInvolved from '../Components/ActorsInvolved';
import BookmarkTitle from '../Components/BookmarkTitle';
import RateTitle from '../Components/RateTitle';
import './TitleDetails.css';

function TitleDetails() {
  const { slug } = useParams();

  const [title, setTitle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/titles/${slug}`)
      .then((res) => res.json())
      .then((data) => setTitle(data))
      .catch((err) => console.log(err));
  }, [slug]);

  
  if (!title) return(
    <div>
      <h1>Loading...</h1>
      {navigate("*")}
    </div>
  );
    

  
  return (
    <div className='container-fluid'>
      <div className='container text-center bg-light p-4 rounded shadow-sm'>
           <div className='row row-cols-2'>
           <div  id ="title-poster" className='col1'>
             <img src={title.poster} alt='No Image Available' className='img-fluid mb-2'/>
           </div>
           <div id="title-information" className='col2' >
             <div className='col'>
               <div id="title" className='row1'>
                   <h2 className='mb-3'>{title.primaryTitle}</h2>
               </div>
               <div id='date-rating' className='row2 row-cols-3 d-flex flex-wrap mb-3'>
                <h5 className='col1'>Aired on: {title.startDate}</h5>
                <h5 className='col2'></h5>
                <h5 className=' col3'>Rating: {title.averageRating}</h5>
               </div>
               <div className='row3 bg-light p-4 rounded-1 shadow-lg mb-3'>
                 <p className='text-secondary fs-5 mb-0 text-long'>{title.plot}</p>
               </div>
               <div className='row4 d-flex flex-wrap'>
               {title.genres && <h5 className='p-1'>Genres: </h5>}
                 { title.genres && title.genres.map((g,i) => 
                 <div className={`col${i} p-1`} key={i}>
                 <h5 className='font-italic'>{g}</h5>
                 </div>)}
               </div>
             </div>
           </div>
         </div>


         <div id="buttons" className='row row-cols-2 mt-3 mb-3'>
           <div className=''>
             <div className='row-col-2 '>
             <BookmarkTitle tconst={title.tconst} />
             <RateTitle tconst={title.tconst} />
             </div>
           </div>
         </div>
         
 
         
         <div id="Actos" className='row mb-5'>
           <ActorsInvolved crew={title.crew}/>
         </div>
         <div id="Similar-titles" className='row'>
          <SimilarTitles titleId={title.tconst}/>
         </div>
      </div>
        
       
    </div>
  );
}

export default TitleDetails;
