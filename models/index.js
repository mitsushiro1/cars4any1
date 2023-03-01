const User = require('./User');
const City = require('./City');
const Vehicle = require('./Vehicle');
const Posting = require('./Posting');
const Comment = require('./Comment');

User.hasOne(City, {
  foreignKey: 'user_city_id',
  onDelete: 'set null'
});

Posting.hasOne(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Posting.hasOne(City, {
  foreignKey: 'posting_city_id',
  onDelete: 'cascade'
});

Posting.hasOne(Vehicle, {
  foreignKey: 'vehicle_id',
  onDelete: 'cascade'
});

Posting.hasMany(Comment, {
  foreignKey: 'posting_id',
  onDelete: 'cascade'
});

Comment.belongsTo(Posting, {
  foreignKey: 'posting_id',
  onDelete: 'cascade'
});





module.exports = { User, City, Vehicle, Posting, Comment};