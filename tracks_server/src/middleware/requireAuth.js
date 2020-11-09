const JWT = require("jsonwebtoken");
const MONGOOSE = require("mongoose");
const User = MONGOOSE.model("User");

module.exports = (req, res, next) => {
  // If we determine that a user does successfully have a JWT
  //=> call callback function.

  // whenever a request comes into express it auto lower cases any header name
  const { authorization } = req.headers;
  // authorization === Bearer ...
  if (!authorization) {
    return res.status(401).send({ e: "You must be logged in!!" });
  }

  const token = authorization.replace("Bearer ", "");
  JWT.verify(token, "MY_SECRET_KEY", async (e, payload) => {
    // payload === data encoded inside this token
    if (e) {
      return res.status(401).send({ e: "You must be logged in!!" });
    }

    // Destructor userId from payload
    // return an string
    const { userId } = payload;

    //Tell mongoose to go and take a look at our mongoDB collection
    // attempt to find data based on userId
    // return an object
    const user = await User.findById(userId);

    // attach user data to req 
    // => every time call this middleware
    //it'll has and user data inside it req
    req.user = user;

    // call next which is a sign that our middleware is all done running.
    // We can call the next middleware inside of our chain of middleware.
    next();
  });
};
