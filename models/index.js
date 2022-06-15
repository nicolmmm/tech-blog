const User = require("./User");
const Blogs = require("./Blogs");
const Comments = require("./Comments");

Blogs.belongsTo(User);

User.hasMany(Blogs, {
  foreignKey: "userId",
});

User.hasMany(Comments, {
  foreignKey: "blogId",
});

Comments.belongsTo(Blogs);

Blogs.hasMany(Comments, {
  foreignKey: "blogId",
});

/* This one */
Comments.belongsTo(User);

module.exports = { User, Blogs, Comments };
