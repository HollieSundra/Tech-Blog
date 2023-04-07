const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// Get all posts created by the currently logged in user
router.get('/', withAuth, async (req, res, next) => {
  try {
    const dbPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], include: { model: User, attributes: ['username'] } },
        { model: User, attributes: ['username'] }
      ]
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    next(err);
  }
});

// Get a single post by ID for editing
router.get('/edit/:id', withAuth, async (req, res, next) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        { model: Comment, attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], include: { model: User, attributes: ['username'] } },
        { model: User, attributes: ['username'] }
      ]
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = dbPostData.get({ plain: true });

    res.render('edit-post', { post, loggedIn: true });
  } catch (err) {
    next(err);
  }
});

// Render the page for creating a new post
router.get('/new', (req, res) => {
  res.render('add-post', { loggedIn: true });
});

module.exports = router;
