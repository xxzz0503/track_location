const EXPRESS = require("express");
const MONGOOSE = require("mongoose");

const requireAuth = require("../middleware/requireAuth");

const Track = MONGOOSE.model("Track");

const ROUTER = EXPRESS.Router();

// all the router make in this file has passed requireAuth
ROUTER.use(requireAuth);

ROUTER.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});
ROUTER.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide name and locations" });
  }

  try {
    const track = new Track({
      name: name,
      locations: locations,
      userId: req.user._id,
    });

    await track.save();
    res.send(track);
  } catch (e) {
    res.status(422).send({ error: e.message });
  }
});

module.exports = ROUTER;
