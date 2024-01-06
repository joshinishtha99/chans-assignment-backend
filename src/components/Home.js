import React from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const redirectSignup = () => {
        try{
            navigate('/signup');
        } catch (error) {
            return console.error('Error redirecting:', error.response.data);
        }
    }


    return (
        <div className='home'>
            <div className='EntryText'>Hi There!! Let's Blog</div>
            <div className='SignupPrompt'>
                <div className='SignupText'>You look new, let's begin your journey</div>
                <div className='SignupButton' onClick={redirectSignup}>SignUp</div>
            </div>
        </div>
    );
}

export default Home;