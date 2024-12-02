import React from 'react';
import { useState, useEffect } from 'react';
import HighlightedTitle from '../Components/HighlightedTitle';
import Search from '../Components/Search';
import GetRandomTitles from '../Helpers/GetRanomTitles';

function Home() {
  //Define the initial states of the program
  const [data, setData] = useState([]);
  const [randomTitles, setRandomTitles] = useState([]);
  const [isPaused, setPaused] = useState(false);

  //Fetch titles from api
  const randomPage = () => Math.floor(Math.random() * 100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextPage = randomPage();

      fetch(`http://localhost:5001/api/titles?page=${nextPage}&pageSize=25`)
        .then((res) => res.json())
        .then((data) => {
          setData((prevData) => [...prevData, ...data.items]);
        })
        .catch((err) => console.log(err));
    }, 10000);

    return () => clearInterval(intervalId);
  });

  //Update Random titles
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      if (data.length > 0) {
        const newRandomTitles = GetRandomTitles(data, 5);
        setRandomTitles(newRandomTitles);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [data, isPaused]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  return (
    <div className="App">
      <HighlightedTitle data={randomTitles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </div>
  );
}

export default Home;
