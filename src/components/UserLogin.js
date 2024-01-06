import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserLogin.css';
import { useNavigate } from 'react-router-dom'; 

const UserLogin = () => {
  const [userData, setUserData] = useState({
    username: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username: userData.username });
      console.log('User logged in successfully!');
      navigate('/articles',  { state: { username: userData.username } });
    } catch (error) {
      console.error('Error logged in:', error.response.data);
    }
  };
  const redirectSignup = () => {
    try {
      navigate('/signup');
    } catch (error) {
      console.error('Error redirecting:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <div className='LoginBoxBorder'>
        <div className='LoginBox'>      
          <div className='Heading'>Login!!</div>
          <div className='LoginEntries'>
            <input className='EntryRecord' placeholder='Username' type="text" name="username" onChange={handleInputChange} required/>
          </div>
          <button className='LoginButton' onClick={handleLogin}>Login</button>
          <div className='SignupPrompt'>
            <div className='SignupText'>New User?</div>
            <button className='SignupButton' onClick={redirectSignup}>Signup</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;