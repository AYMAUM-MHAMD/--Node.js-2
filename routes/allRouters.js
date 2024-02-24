const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const AuthUser = require("../models/authUser");
const bcrypt = require("bcrypt");

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
  try {
    const result = await AuthUser.create(req.body);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  console.log("__________________________________________");

  const loginUser = await AuthUser.findOne({ email: req.body.email });
  console.log(loginUser);

  if (loginUser == null) {
    console.log("this email not found in DATABASE");
  } else {
    const match = await bcrypt.compare(req.body.password, loginUser.password);
    if (match) {
      console.log("correct email & password");
    } else {
      console.log("wrong password");
    }
  }
});

router.get("/home", userController.user_index_get);

router.get("/edit/:id", userController.user_edit_get);

router.get("/view/:id", userController.user_view_get);

router.post("/search", userController.user_search_post);

router.delete("/edit/:id", userController.user_delete);

router.put("/edit/:id", userController.user_put);

module.exports = router;
