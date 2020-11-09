require("./models/User");
require("./models/Track");
const EXPRESS = require("express");
const APP = EXPRESS();
const PATH = require("path");
const BODY_PARSER = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const MONGOOSE = require("./MongoDB/MongooseFactory");
const requireAuth = require("./middleware/requireAuth");
const trackRoutes = require("./routes/trackRoutes");
// make connection to mongoose db
MONGOOSE.connection();

APP.use(BODY_PARSER.json());
APP.use(authRoutes);
APP.use(trackRoutes);

// whenever someone makes a request to our root route
// we gonna first run that middleware 
// to make sure that user provided a valid JWT
// if they did well then allow access to that route
APP.route("/").get(requireAuth, (req, res) => {
  res.send(`Info: ${req.user}`);
});

APP.listen(3000, () => {
  console.log("Server is run on port 3000");
});
