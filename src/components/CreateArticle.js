import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateArticle.css';
import { useLocation , useNavigate } from 'react-router-dom';

const CreateArticle = () => {
    const { state } = useLocation();
    const username = state ? state.username : null;

    const [articleData, setArticleData] = useState({
      title: '',
      author: username,
      description: '',
      body: '',
    });

    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      setArticleData({ ...articleData, [e.target.name]: e.target.value });
    };
  
    const handleCreateArticle = async (e) => {
      console.log('Username:', username); // Log the username before making the API call
      e.preventDefault(); 
        try {
          console.log(articleData);
          await axios.post('http://localhost:3000/articles', articleData);
          console.log('Article created successfully!');
          navigate('/articles', { state: { username: username } });
        } catch (error) {
          console.error('Error creating article:', error.response.data);
        }
    };
  
    return (
    <div className='container'>
        <div className='ArticleBoxBorder'>
          <div className='ArticleBox'>      
            <div className='Heading'>Write an Article</div>
            <div className='ArticleEntries'> 
              <input className='EntryRecord' placeholder='Title' type="text" name="title" onChange={handleInputChange} required/>
              <textarea className='EntryDesc' placeholder='Description' type="text" name="description" onChange={handleInputChange} required/>
              <textarea className='EntryBody' placeholder='Body' type="text" name="body" onChange={handleInputChange} required/>
            </div>
            <button className='PostButton'  onClick={handleCreateArticle}>Post</button>
          </div>
        </div>
    </div>
    );
};
  
export default CreateArticle;
  