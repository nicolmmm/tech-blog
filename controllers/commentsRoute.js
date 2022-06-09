const router = require("express").Router();
const { Comments } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all users, sorted by name
    const commentData = await Comments.findAll();
    // Pass serialized data into Handlebars.js template
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comments.findByPk(req.params.id);
    // Pass serialized data into Handlebars.js template
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const objData = {
      blogId: req.body.blogId,
      commentBody: req.body.commentBody,
      userId: req.session.userId,
    };
    console.log(objData);
    const commentData = await Comments.create(objData);

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Get all users, sorted by name
    const commentData = await Comments.destroy({
      where: { id: req.params.id },
    });
    // Pass serialized data into Handlebars.js template
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
