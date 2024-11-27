import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import NameDetails from './Components/NameDetails';
import Navbar from './Components/Navbar';
import NoPage from './Components/NoPage';
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path='*' exact Component={NoPage} />
        <Route path='/Name/:slug' exact Component={NameDetails} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
