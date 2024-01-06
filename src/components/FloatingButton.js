import React from 'react';
import '../styles/FloatingButton.css';
import { CiEdit } from "react-icons/ci";
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingButton = () => {  

  const { state } = useLocation();
  const username = state ? state.username : null;
  const navigate = useNavigate();

  const handleCreateArticle = () => {
    console.log(username);
    try {
      navigate('/create-article', { state: { username : username } });
    } catch (error) {
      console.error('Error redirecting:', error.response.data);
    }
  };

  return (
    <div className='floating-button-border'>
        <div className="floating-button" onClick={handleCreateArticle}>
            <CiEdit className='icon'/>
        </div>
    </div>
  );
};

export default FloatingButton;