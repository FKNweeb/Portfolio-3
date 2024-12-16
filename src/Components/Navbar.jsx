import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Navbar.css';
import { useSearch } from '../Helpers/SearchContext';
import useAuthStore from '../Stores/AuthStore';
import './Search.css';
import Search from './Search';

const Navbar = () => {

  const { searchText, setSearchText } = useSearch();
  const { isLoggedIn, toggleIsLoggedIn } = useAuthStore();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/SearchResult")
    setSearchText("");
    
  };

  function logout() {
    toggleIsLoggedIn(false);
    Cookies.remove('logged_in');
    navigate('/');
  }

  useEffect(() => {
    if (Cookies.get('logged_in')) {
      toggleIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <nav className="navbar p-2">
        <Link to="/" className="homebutton">
          HOME
        </Link>
        <div className='search-container'>
          <form className="search-form h-25">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
              className="search-input h-25"
            />
            <button type="submit" className="search-button" onClick={handleSearchSubmit}>
              🔍
            </button>
          </form>
          <Search />
        </div>
        <div className="auth-buttons">
          <Link to="/createuser" className="create-user">
            Create User
          </Link>
          {!isLoggedIn && <Link to="/login" className="login">
            Login
          </Link>
          }
          {isLoggedIn && (
            <Link to="/profile" className="profile">
              Profile
            </Link>
          )}
          {isLoggedIn && (
            <button onClick={logout} className="logout">
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
