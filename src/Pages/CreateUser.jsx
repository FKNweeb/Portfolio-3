import React, { useState } from 'react';
import './CreateUser.css';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [formData, setFormData] = useState({
    UserName: '',
    UserEmail: '',
    UserPassword: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      setError('An error occured. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-form">
        <h1>Create User</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="UserName"
              placeholder="Enter your username"
              value={formData.UserName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="UserEmail"
              placeholder="Enter your email"
              value={formData.UserEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="UserPassword"
              placeholder="Enter your password"
              value={formData.UserPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            {isLoading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
