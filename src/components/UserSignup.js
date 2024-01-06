import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserSignup.css';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    dob: '',
    hobbies: '',
    age: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      userData.hobbies = userData.hobbies.split(',').map(item => item.trim());
      await axios.post('http://localhost:3000/signup', userData);
      console.log('User signed up successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  const redirectLogin = () => {
    try {
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.response.data);
    }
  };

  return (
    <div className='container'>
      <div className='SignupBoxBorder'>
        <div className='SignupBox'>      
          <div className='Heading'>Signup Yourself Up!!</div>
          <div className='SignupEntries'> 
            <input className='EntryRecord' placeholder='Username' type="text" name="username" onChange={handleInputChange} required />
            <input className='EntryRecord' placeholder='Name' type="text" name="name" onChange={handleInputChange} required />
            <input className='EntryRecord' placeholder='Date of Birth' type="text" name="dob" onChange={handleInputChange} />
            <input className='EntryRecord' placeholder='Hobbies (comma-seperated)' type="text" name="hobbies" onChange={handleInputChange} />
            <input className='EntryRecord' placeholder='Age' type="number" name="age" onChange={handleInputChange} />
          </div>
          <button className='SignupButton' onClick={handleSignup}>Signup</button>
          <div className='LoginPrompt'>
            <div className='LoginText'>Already a user?</div>
            <button className='LoginButton' onClick={redirectLogin}>Login</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;