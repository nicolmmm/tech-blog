const User = require("./User");
const Blogs = require("./Blogs");
const Comments = require("./Comments");

Blogs.belongsTo(User, {
  foreignKey: "id",
});

User.hasMany(Blogs, {
  foreignKey: "userId",
});

User.hasMany(Comments, {
  foreignKey: "blogId",
});

/* Comments.belongsTo(Blogs, {
  foreignKey: "id",
}); */

Blogs.hasMany(Comments, {
  foreignKey: "blogId",
});

Comments.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = { User, Blogs, Comments };
