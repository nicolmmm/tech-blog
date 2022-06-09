const User = require("./User");
const Blogs = require("./Blogs");
const Comments = require("./Comments");

Blogs.belongsTo(
  User /* , {
  foreignKey: "userId",
} */
);

User.hasMany(
  Blogs /* , {
  foreignKey: "userId",
} */
);

User.hasMany(Comments, {
  foreignKey: "blogId",
});

/* This one */
Comments.belongsTo(Blogs, {
  foreignKey: "id",
});

Blogs.hasMany(Comments, {
  foreignKey: "blogId",
});

/* This one */
Comments.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = { User, Blogs, Comments };
