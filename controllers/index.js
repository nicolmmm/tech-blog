const router = require("express").Router();
const blogRoute = require("./blogsRoute");
const userRoute = require("./userRoute");
const commentRoute = require("./commentsRoute");

router.use("/", blogRoute);
router.use("/user", userRoute);
router.use("/comment", commentRoute);

module.exports = router;
