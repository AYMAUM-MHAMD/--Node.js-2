const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const result = await AuthUser.create(req.body);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/home", userController.user_index_get);

router.get("/edit/:id", userController.user_edit_get);

router.get("/view/:id", userController.user_view_get);

router.post("/search", userController.user_search_post);

router.delete("/edit/:id", userController.user_delete);

router.put("/edit/:id", userController.user_put);

module.exports = router;
