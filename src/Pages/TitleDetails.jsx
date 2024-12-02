import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../Components/Search';
import './TitleDetails.css'
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
    <div className='container-fluid'>
      <Search />
      {/* <div className='container'>
        {title.map((t) => (
          <div className='row row-cols-2'>
            <img src='' alt='Photo Goes here'></img>
            <p>{t.primaryTitle}</p>
            <p>{t.plot}</p>
          </div>
        ))}
      </div> */}
        {title.map(t => (
      <div className='container text-center'>
           <div className='row row-cols-2'>
           <div  id ="title-poster"className='col1'>
             <img src='https://m.media-amazon.com/images/M/MV5BMTkzNDc3NjYzNF5BMl5BanBnXkFtZTgwOTg3NzA0MTE@._V1_SX300.jpg' alt='Photo Goes Here'/>
           </div>
           <div id="title-information" className='col2' >
             <div className='col'>
               <div id="title" className='row1'>
                   <h2>{t.primaryTitle}</h2>
               </div>
               <div className='row2'>
                 <p>{t.plot}</p>
               </div>
             </div>
           </div>
         </div>
         <div id="buttons" className='row row-cols-2 '>
           <div className=''>
             <div className=' buttons-space row-col-2'>
 
             <button>Bookmark</button>
             <button>Rate</button>
             </div>
           </div>
         </div>
         <div className='space'>
 
         </div>
         <div id="Actos" className='row'>
           <div className='col'>
             <div className='card col-1'>
               <img src='' alt='Actor Photo'></img>
             </div>
           </div>
         </div>
         <div className='space'>
 
         </div>
         <div id="Similar-titles" className='row'>
         <div className='col'>
             <div className='card col-1'>
               <img src='' alt='Movie Photo'></img>
             </div>
           </div>
         </div>
      </div>
        ))}
       
    </div>
  );
}

export default TitleDetails;
