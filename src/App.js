import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import NameDetails from './Components/NameDetails';
import Navbar from './Components/Navbar';
import NoPage from './Pages/NoPage';
import Home from './Pages/Home';
import './App.css';
import Login from './Pages/Login';
import CreateUser from './Pages/CreateUser';
import Profile from './Components/Profile';

function App() {
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

export default App;
