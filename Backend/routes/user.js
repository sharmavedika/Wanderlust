const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const userController = require("../controllers/users.js");

// ✅ Signup
router.post("/signup", wrapAsync(userController.signup));

// ✅ Login
router.post("/login", userController.login);

// ✅ Logout
router.get("/logout", userController.logout);

// ✅ Get current logged in user (React will call this to check session)
router.get("/me", userController.getCurrentUser);

module.exports = router;