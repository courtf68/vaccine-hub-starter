//two post funcs here
//reqs here
const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body); //200 is it worked
    return res.status(200).json({ user }); //new new^
    //login
    //
  } catch (err) {
    next(err);
  }
});
router.post("/register", async (req, res, next) => {
  //url to try in posty is localhost:3001/auth/register w fields
  try {
    const user = await User.register(req.body);
    return res.status(201).json({ user }); //201 is created
    //reg
    //create user
  } catch (err) {
    next(err);
  }
});

module.exports = router;
