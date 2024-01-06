import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ArticleList.css';
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate , useLocation } from 'react-router-dom';
import FloatingButton from './FloatingButton';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  const { state } = useLocation();
  const username = state ? state.username : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/articles');
        setArticles(response.data.reverse());
      } catch (error) {
        console.error('Error fetching articles:', error.response.data);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (articleId) => {
    try{
      await axios.delete(`http://localhost:3000/articles/${articleId}`);
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== articleId));
      console.log(`Article with ID ${articleId} deleted successfully`);
    } catch(error) {
      console.error('Error Deleting Post: ', error.response.data);
    }
  };

  const handleEdit = (articleId) => {
    try {
      navigate('/edit-article', { state: { username: username , id : articleId} });
    } catch(error) {
      console.error('Error Editing Post: ', error.response.data);
    }
  };

  return (
    <div className='container'>
      <div className='heading'>Articles</div>
      <div className='ArticleList'>
        {articles.map((article) => (
          <div key={article._id} className='ArticleEntry'>
            <div className='ArticleTopBar'>
              <div className='ArticleTitleAndAuthor'>
                <div className='ArticleTitle'>{article.title}</div> 
                <div className='ArticleAuthor'>by {article.author}</div>
              </div>
              {username && username === article.author && (
              <div className='SideIcons'>
                <div className='iconBox' onClick={() => handleDelete(article._id)}><MdDeleteOutline className='icon'/></div>
                <div className='iconBox' onClick={() => handleEdit(article._id)}><CiEdit className='icon'/></div>
              </div>
              )}
            </div>
            <div className='ArticleDescription'>{article.description}</div>
            <div className='ArticleBody'>{article.body}</div>
          </div>
        ))}
      </div>
      <FloatingButton />
    </div>
  );
};

export default ArticleList;
