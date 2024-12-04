import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import NameDetails from './Pages/NameDetails';
import Navbar from './Components/Navbar';
import NoPage from './Pages/NoPage';
import Home from './Pages/Home';
import './App.css';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import CreateUser from './Pages/CreateUser';
import Profile from './Pages/Profile';
import { SearchProvider } from './Helpers/SearchContext';
import TitleDetails from './Pages/TitleDetails';
import SearchResult from './Pages/SearchResult';

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="*" exact Component={NoPage} />
          <Route path="/createuser" exact Component={CreateUser} />
          <Route path="/login" exact Component={Login} />
          <Route path="/profile" exact Component={Profile} />
          <Route path="/Name/:slug" exact Component={NameDetails} />
          <Route path="/Title/:slug" exact Component={TitleDetails} />
          <Route path="/SearchResult" exact Component={SearchResult} />
        </Routes>
        <Footer />
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
