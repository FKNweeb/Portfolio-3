import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import NameDetails from './Components/NameDetails';
import Navbar from './Components/Navbar';
import NoPage from './Pages/NoPage';
import Home from './Pages/Home';
import './App.css';
import Login from './Pages/Login';
import CreateUser from './Pages/CreateUser';
import Profile from './Components/Profile';
import HighlightedTitle from './Components/HighlightedTitle ';

function App() {
  // const url = 'https://api.themoviedb.org/3/discover/movie';
  const localUrl = 'http://localhost:5001/api/titles?page=0&pageSize=25'
  const options = {
    method:'GET',
    headers:{
      accept:'application/json',

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
});

  //Update Random titles
  useEffect(() => {
    if(isPaused) return;

    const intervalId = setInterval(() => {
      if(data.length > 0){
        const newRandomTitles = GetRandomTitles(data, 5);
        setRandomTitles(newRandomTitles);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [data, isPaused]);
 
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="*" exact Component={NoPage} />
        <Route path="/createuser" exact Component={CreateUser} />
        <Route path="/login" exact Component={Login} />
        <Route path="/profile" exact Component={Profile} />
        <Route path="/Name/:slug" exact Component={NameDetails} />
      </Routes>
    </BrowserRouter>
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
