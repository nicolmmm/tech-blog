const router = require("express").Router();
const { Blogs, Comments, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blogs.findAll({ include: Comments });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

    console.log("User ID is", blog.userId, "session ID is", req.session.userId);
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

router.put("/:id", async (req, res) => {
  try {
    const blogData = await Blogs.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const blogData = await Blogs.create({
      title: req.body.title,
      body: req.body.body,
      userId: req.session.userId,
    });
    console.log("WORKING");
    res.render("homepage");
    /* res.status(200).json(blogData) */
  } catch (err) {
    console.log("ERROR *********", err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blogs.destroy({ where: { id: req.params.id } });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
