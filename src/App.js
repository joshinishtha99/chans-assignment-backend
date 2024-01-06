import React from 'react';
import UserSignup from './components/UserSignup';
import CreateArticle from './components/CreateArticle';
import ArticleList from './components/ArticleList';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import EditArticle from './components/EditArticle';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/articles" element={<ArticleList/>} />
        <Route path="/signup" element={<UserSignup/>} />
        <Route path="/create-article" element={<CreateArticle/>} />
        <Route path="/edit-article" element={<EditArticle/>} />
      </Routes>
    </Router>
  );
}

export default App;
