const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

// Home page
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        },
        { model: User, attributes: ['username'] }
      ]
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Single post page
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        },
        { model: User, attributes: ['username'] }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// Signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

// 404 page
router.get('*', (req, res) => {
  res.status(404).send("Can't go there!");
});

module.exports = router;
