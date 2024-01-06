import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/EditArticle.css';

const EditArticle = () => {
    const { state } = useLocation();
    const username = state ? state.username : null;
    const id = state ? state.id : null;

    const [article, setArticle] = useState({ title: '', description: '', body: '' });
    
    const navigate = useNavigate();

    useEffect(() => {
      fetchArticle(id);
    }, [id]);
  
    const fetchArticle = async (articleId) => {
      try {
        const response = await axios.get(`http://localhost:3000/articles/${articleId}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error.response.data);
      }
    };

    const handleInputChange = (e) => {
      setArticle({ ...article, [e.target.name]: e.target.value });
    };
  
    const handleEdit = async () => {
        try {
          await axios.put(`http://localhost:3000/articles/${id}`, article);
          console.log(`Article with ID ${id} updated successfully`);
          navigate('/articles', { state: { username: username } })
        } catch (error) {
          console.error('Error updating article:', error.response.data);
        }
      };
  
    return (
    <div className='container'>
        <div className='ArticleBoxBorder'>
          <div className='ArticleBox'>      
            <div className='Heading'>Edit your Article</div>
            <div className='ArticleEntries'> 
              <input className='EntryRecord' value={article.title} type="text" name="title" onChange={handleInputChange} required/>
              <textarea className='EntryDesc' value={article.description} type="text" name="description" onChange={handleInputChange} required/>
              <textarea className='EntryBody' value={article.body} type="text" name="body" onChange={handleInputChange} required/>
            </div>
            <button className='UpdateButton'  onClick={handleEdit}>Update</button>
          </div>
        </div>
    </div>
    );
};
  
export default EditArticle;
  