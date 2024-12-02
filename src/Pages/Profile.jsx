import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Profile() {
  const [user, setUser] = useState({
    userName: 'Loading...',
    userEmail: 'Loading...',
    bookMarkNames: [],
    bookMarkTitles: []
  });
  const [persons, setPersons] = useState([]);
  const [posters, setPosters] = useState([]);
  const [images, setImages] = useState([]);


  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users/getUser', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('logged_in'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser({ userName: 'Unknown', userEmail: 'Unknown', bookMarkNames: [], bookMarkTitles: [] });
      }
    };

    fetchUser();
  }, []); // Only fetch user data once when the component mounts.

  useEffect(() => {
    const fetchPersons = async () => {
      if (user.bookMarkNames.length === 0) return;
      const baseUrl = "https://api.themoviedb.org/3/search/person?query=";
      const apiKey = "&api_key=9b7b63dc32674b6a775fbc61bf528ccb";
      const newPersons = [];
      
      try {
        for (let index = 0; index < user.bookMarkNames.length; index++) {
          const person = user.bookMarkNames[index].name.primaryName;
          const response = await fetch(baseUrl + person + apiKey);
          const data = await response.json();
          newPersons.push(data.results[0]);
        }
        setPersons(newPersons);
      } catch (error) {
        console.error("Failed to fetch persons", error);
      }
    };
    fetchPersons();
  }, [user.bookMarkNames]);

  useEffect(() => {
    const fetchMovieImages = async () => {
    if (user.bookMarkTitles.length === 0) { return; }

    const posterList = []
    for (let index = 0; index < user.bookMarkTitles.length; index++) {
      console.log(user.bookMarkTitles);
      const response = await fetch(`http://localhost:5001/api/titles/search?keywords=${user.bookMarkTitles[index].title.primaryTitle}`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (!response.ok) { console.warn(`Failed to fetch movie at index ${index}`); continue; }  
      const data = await response.json();

      posterList.push({poster: data.poster, title: data.primaryTitle})
    }
    setPosters(posterList)
    } 
    fetchMovieImages();
  }, [user.bookMarkTitles]);

  useEffect(() => {
    // Fetch images only after person data is loaded
    const fetchPersonImages = async () => {
      if (persons.length === 0) return;

      const apiKey = "9b7b63dc32674b6a775fbc61bf528ccb";
      const baseUrl = "https://image.tmdb.org/t/p/";
      const fileSize = "w200";
      const newImages = [];

      try {
        for (let index = 0; index < persons.length; index++) {
          const person = persons[index];

          if (!person || !person.name) {
            console.warn(`Skipping invalid person at index ${index}`);
            continue;
          }

          const response = await fetch(
            `https://api.themoviedb.org/3/person/${person.id}/images?api_key=${apiKey}`
          );
          const data = await response.json();

          // Ensure there are profiles and file_path exists
          if (data.profiles && data.profiles[0] && data.profiles[0].file_path) {
            const imagePath = `${baseUrl}${fileSize}${data.profiles[0].file_path}`;
            newImages.push({ src: imagePath, name: person.name });
          }
        }

        setImages(newImages); // Update images state at once
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchPersonImages();
  }, [persons]); // Trigger fetching images when `persons` updates.

  return (
    <div>
      <h1>Hello there: {user.userName}</h1>
      <p>Email: {user.userEmail}</p>

      <h2>Bookmarked titles:</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "flex-start", // Aligns items from the top
        }}
      >
        {posters.map((poster, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              width: "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "200px"
            }}
          >
            <img src={poster.poster} alt={`Profile ${index + 1}`} style={{ width: "100px", height: "auto", margin: "0 auto" }}/>
            <p style={{ wordWrap: "break-word", whiteSpace: "normal", margin: "5px 0" }}>{poster.title}</p>
          </div>
        ))}
      </div>


      <h2>Bookmarked names:</h2>
      <div style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "flex-start", // Aligns items from the top
        }}>
        {images.map((img, index) => (
          <div key={index} style={{
            textAlign: "center",
            width: "120px",
            display: "flex",
            flexDirection: "column",
            minHeight: "200px"
          }}>
            <img src={img.src} alt={`Profile ${index + 1}`} style={{ width: "100px", height: "auto", margin: "0 auto" }} />
            <p style={{ wordWrap: "break-word", whiteSpace: "normal", margin: "5px 0" }}>{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
