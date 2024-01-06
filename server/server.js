const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/chans-assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  dob: String,
  hobbies: [String],
  age: Number,
});

const User = mongoose.model('User', userSchema);

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  body: String,
  date: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  const { username } = req.body;
  console.log(username);
  const user = await User.findOne({ username });

  if (user) {
    res.status(200).json({ message: 'Login successful!', user });
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});

app.post('/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.send(article);
  } catch(error) {
    res.status(500).send(error);
  }
});

app.put('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
