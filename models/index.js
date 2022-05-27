const User = require("./User");
const Blogs = require("./Blogs");
const Comments = require("./Comments");

Blogs.belongsTo(User, {
  foreignKey: "id",
});

User.hasMany(Blogs, {
  foreignKey: "userId",
});

Comments.belongsTo(Blogs, {
  foreignKey: "id",
});

Blogs.hasMany(Comments, {
  foreignKey: "blogId",
});

Comments.belongsTo(User, {
  foreignKey: "id",
});

User.hasMany(Comments, {
  foreignKey: "blogId",
});

module.exports = { User, Blogs, Comments };
