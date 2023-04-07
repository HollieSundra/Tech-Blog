//Importing Dependences
const router = require('express').Router();

const {
    Post,
    User,
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');

//Get all comments
router.get('/:postId', (req, res) => {
    Comment.findAll({
      where: { postId: req.params.postId },
      include: { model: User, attributes: ['username'] },
      order: [['createdAt', 'DESC']]
    })
    .then(dbCommentData => res.json({ comments: dbCommentData }))
    .catch(err => res.status(500).json(err));
  });

//Create new comment  
  router.post("/", withAuth, (req, res) => {
    Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => res.json(newComment))
    .catch(err => res.status(500).json(err));
  });
 
//Export Router  
  module.exports = router;
