const router = require("express").Router();
const blogRoute = require("./blogsRoute");
const userRoute = require("./userRoute");
const commentRoute = require("./commentsRoute");
const homeRoute = require("./homeRoute");

router.use("/", homeRoute);
router.use("/blog", blogRoute);
router.use("/user", userRoute);
router.use("/comment", commentRoute);

module.exports = router;
