const router = require("express").Router();
const session = require("express-session");
const { Blogs, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

//gets all posts and associated users renders them to homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await Blogs.findAll({ include: User });

    const blogPosts = blogData.map((blogs) => blogs.get({ plain: true }));
    res.render("homepage", {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to redirect to new post page
router.get("/newpost", withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.findAll({ include: Comments });

    const blogPosts = blogData.map((blogs) => blogs.get({ plain: true }));
    res.render("newPost", {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to login page. If user is already logged in this will redirect the user back to the home page.
router.get("/login", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/");
    } else {
      res.render("login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
