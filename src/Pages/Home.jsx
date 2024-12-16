import React from 'react';
import { useState, useEffect } from 'react';
import HighlightedTitle from '../Components/HighlightedTitle';
import './Home.css';
import Search from '../Components/Search';
import GetRandomTitles from '../Helpers/GetRanomTitles';
import '../App.css';

function Home() {
  //Define the initial states of the program
  const [data, setData] = useState([]);
  const [randomTitles, setRandomTitles] = useState([]);
  const [isPaused, setPaused] = useState(false);

  //Fetch titles from api
  const randomPage = () => Math.floor(Math.random() * 100);
  
  const fetchInitialData = async () => {
    const page = randomPage();

    try{
      const response = await fetch(`http://localhost:5001/api/titles?page=${page}&pageSize=100`);
      const result = await response.json();
      setData(result.Item || []);
      setRandomTitles(GetRandomTitles(result.items || [], 5));
    }catch (error){
      console.log(error);
    }
  };

  useEffect( () => {
    fetchInitialData();
  }, []);

  //Periodically fetch new titles
  useEffect(()=>{
    if(isPaused) return;

    const intervalId = setInterval(() => {
      fetchInitialData();
    }, 20000);

    return () => clearInterval(intervalId);
  })
  

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  return (
    <div className='App'>
      <div className='jumbotron jumbotron-fluid'>
        <h4 className='display-4'>About the application</h4>
        <p className='lead display-6'>This is an application where you can search for titles and persons involved in movie industry. You can create an account,
          log in and then bookmark your preferences and rate them.
        </p>
      </div>
      <HighlightedTitle data={randomTitles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </div>
  );
}

export default Home;
