//two post funcs here
//reqs here
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    //login
    //
  } catch (err) {
    next(err);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    //reg
    //create user
  } catch (err) {
    next(err);
  }
});

module.exports = router;
