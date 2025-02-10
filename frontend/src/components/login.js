import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', { email });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setIsLoggedIn(true);
        setUserEmail(email);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <h2>Welcome {userEmail}</h2>
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
