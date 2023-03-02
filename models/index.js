const User = require('./User');
const City = require('./City');
const Vehicle = require('./Vehicle');
const Posting = require('./Posting');
const Comment = require('./Comment');

User.hasMany(Posting, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})

Posting.belongsTo(User, {
  foreignKey: 'user_id',
});

Posting.hasOne(Vehicle, {
  foreignKey: 'vehicle_id',
  onDelete: 'cascade'
});

Vehicle.belongsToMany(Posting, {
  foreignKey: 'vehicle_id'
});

Posting.hasMany(Comment, {
  foreignKey: 'posting_id',
  onDelete: 'cascade'
});

Comment.belongsTo(Posting, {
  foreignKey: 'posting_id',
  onDelete: 'cascade'
});

module.exports = { User, Vehicle, Posting, Comment};