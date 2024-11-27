import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search:', searchText);
        // Implement search functionality here
    };

    return (
        <nav className="navbar">
            <Link to="/" className='homebutton'>HOME</Link>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">🔍</button>
            </form>
            <div className="auth-buttons">
                <button className="create-user">Create User</button>
                <button className="login">Login</button>
            </div>
        </nav>
    );
};

export default Navbar;
