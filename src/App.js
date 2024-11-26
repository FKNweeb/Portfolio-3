import { useEffect, useState } from 'react';
import './App.css';
import HighlightedTitle from './Components/HighlightedTitle ';
import { auth } from './auth';

function App() {
  // const url = 'https://api.themoviedb.org/3/discover/movie';
  const localUrl = 'http://localhost:5001/api/titles?page=0&pageSize=25'
  const options = {
    method:'GET',
    headers:{
      accept:'application/json',
      Authorization: auth
    }
  };


  //Define the initial states of the program
  const [data, setData] = useState([]);
  const [randomTitles, setRandomTitles]=useState([]);
  const [isPaused, setPaused] = useState(false);
  


  //Fetch titles from api 
  const randomPage = () => Math.floor(Math.random() * 100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextPage = randomPage();
      console.log(nextPage)
      fetch(`http://localhost:5001/api/titles?page=${nextPage}&pageSize=25`, options)
          .then(res => res.json())
          .then(data => {
              setData(prevData => [...prevData, ...data.items]);
          })
          .catch(err => console.log(err));
    }, 10000);
    
    return () => clearInterval(intervalId);
},[]);

  //Update Random titles
  useEffect(() => {
    if(isPaused) return;

    const intervalId = setInterval(() => {
      if(data.length > 0){
        const newRandomTitles = GetRandomTitles(data, 5);
        setRandomTitles(newRandomTitles);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [data, isPaused]);
 
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  

  return (
    <HighlightedTitle data={randomTitles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
  );
}


function GetRandomTitles(arr, count){
  const shuffled = [...arr];
  
  // Shuffle the array
  for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  // Return the first `count` elements
  return shuffled.slice(0, count);
}

export default App;
