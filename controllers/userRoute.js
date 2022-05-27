const router = require("express").Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    // Pass serialized data into Handlebars.js template
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Get all users, sorted by name
    const userData = await User.destroy({ where: { id: req.params.id } });
    // Pass serialized data into Handlebars.js template
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
