const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const User = mongoose.model("User");

ROUTER.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    // create token and send with response with secret key
    const token = JWT.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token: token });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

ROUTER.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ error: "Email not found" });
  }

  try {
    await user.comparePassword(password);
    const token = JWT.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (e) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = ROUTER;
