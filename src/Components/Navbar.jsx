import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Navbar.css';
import useAuthStore from '../Stores/AuthStore';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');

  const { isLoggedIn, toggleIsLoggedIn } = useAuthStore();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchText);
    // Implement search functionality here
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
    <nav className="navbar">
      <Link to="/" className="homebutton">
        HOME
      </Link>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
      <div className="auth-buttons">
        <Link to="/createuser" className="create-user">
          Create User
        </Link>
        <Link to="/login" className="login">
          Login
        </Link>
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
  );
};

export default Navbar;
