const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between models using Sequelize
User.hasMany(Post, {
  foreignKey: 'user_id' // Foreign key in the "posts" table that points to the "id" column in the "users" table
});

User.hasMany(Comment, {
  foreignKey: 'user_id' // Foreign key in the "comments" table that points to the "id" column in the "users" table
});

Post.belongsTo(User, {
  foreignKey: 'user_id' // Foreign key in the "posts" table that points to the "id" column in the "users" table
});

Post.hasMany(Comment, {
  foreignKey: 'post_id' // Foreign key in the "comments" table that points to the "id" column in the "posts" table
});

Comment.belongsTo(User, {
  foreignKey: 'user_id' // Foreign key in the "comments" table that points to the "id" column in the "users" table
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id' // Foreign key in the "comments" table that points to the "id" column in the "posts" table
});

// Export the models
module.exports = {
  User,
  Post,
  Comment
};
