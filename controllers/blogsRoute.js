const router = require("express").Router();
const { Blogs } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all users, sorted by name
    const blogData = await Blogs.findAll();
    // Pass serialized data into Handlebars.js template
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blogs.findByPk(req.params.id);
    // Pass serialized data into Handlebars.js template
    res.status(200).json(blogData);
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
      userId: req.body.userId,
    });
    // Pass serialized data into Handlebars.js template
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Get all users, sorted by name
    const blogData = await Blogs.destroy({ where: { id: req.params.id } });
    // Pass serialized data into Handlebars.js template
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
