import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';


function Signup() {
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', signupData);
      alert('Signup successful!');
      navigate('/Login');
    } catch (err) {
      setMessage('Error: ' + err.response.data.msg);
    }
  };

  return (
    <div className='con'>
    <div className='container'>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={signupData.name}
          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
        />
        <button type="submit">Signup</button>
        <p>Already Have Account??<a href="./Login">login</a></p>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}

export default Signup;
