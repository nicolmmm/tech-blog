const router = require("express").Router();
const { Blogs, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

//get all blogs with associated comments
router.get("/", async (req, res) => {
  try {
    const blogData = await Blogs.findAll({ include: Comments });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get blog by ID with associated user and comment
router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comments,
          include: User,
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    //checks if post is from the current logged in user and passes "userPost" property to session
    function userOwnPost() {
      if (blog.userId === req.session.userId) {
        return true;
      }
    }

    res.render("blogpost", {
      usersPost: userOwnPost(),
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit blog route
router.put("/:id", async (req, res) => {
  try {
    const blogData = await Blogs.update(
      {
        title: req.body.title,
        body: req.body.body,
        userId: req.session.userId,
      },

      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post new blog route
router.post("/", async (req, res) => {
  try {
    const blogData = await Blogs.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId,
    });
    res.render("homepage");
    /* res.status(200).json(blogData) */
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete blog route
router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blogs.destroy({ where: { id: req.params.id } });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
