const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'content', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve posts' });
  }
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
    } else {
      res.json(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve the post' });
  }
});

// Create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create the post' });
  }
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [numAffectedRows, affectedRows] = await Post.update(
      {
        title: req.body.title,
        content: req.body.post_content,
      },
      { where: { id: req.params.id }, returning: true }
    );
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
    } else {
      res.json(affectedRows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update the post' });
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const numAffectedRows = await Post.destroy({ where: { id: req.params.id } });
    if (numAffectedRows === 0) {
      res.status(404).json({ message: 'No post found with this id' });
    } else {
      res.json({ message: 'Post deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete the post' });
  }
});

module.exports = router;
