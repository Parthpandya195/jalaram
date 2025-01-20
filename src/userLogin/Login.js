import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage('Error: ' + err.response.data.msg);
    }
  };

  return (
    <div className='con'>
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button type="submit">Login</button>
        <p>Don't Have Account??<a href="./Signup">Register</a></p>

      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}

export default Login;
