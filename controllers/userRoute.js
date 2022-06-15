const router = require("express").Router();
const { User, Blogs, Comments } = require("../models");
const withAuth = require("../utils/auth");

//loads dashbaord with user's posts
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blogs, include: Comments }],
    });
    req.session.editPermission = true;
    const userDataPlain = userData.get({ plain: true });
    res.render("dashboard", {
      userDataPlain,
      loggedIn: req.session.loggedIn,
      editPermission: req.session.editPermission,
    });
    console.log(req.session);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update/ edit a user **2022June16 this route not currently being used.
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

//create a new user, logs user in after creating (loggedIn=true)
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.loggedIn = true;
    req.session.userId = userData.id;

    console.log("USER ROUTE", req.session);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login rout
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      console.log("no user data found");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    //checkPasswork() function found in user model- becrypt function
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.loggedIn = true;
    req.session.userId = userData.id;
    res.json({ user: userData, message: "You are now logged in!" });

    console.log("login in route", req.session);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//delete a user **2022June16 this route not currently being used.
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({ where: { id: req.params.id } });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
