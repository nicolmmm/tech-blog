const router = require("express").Router();
const { Comments } = require("../models");

//gets all comments. **2022June16 this route not currently being used.
router.get("/", async (req, res) => {
  try {
    const commentData = await Comments.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//gets comment by ID **2022June16 this route not currently being used.
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comments.findByPk(req.params.id);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update/ edit a comment **2022June16 this route not currently being used.
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

//post comment route
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
    console.log(err);
    res.status(500).json(err);
  }
});

//delete a comment **2022June16 this route not currently being used.
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
