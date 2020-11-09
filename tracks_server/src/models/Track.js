const MONGOOSE = require("mongoose");

const pointSchema = new MONGOOSE.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new MONGOOSE.Schema({
  userId: {
    type: MONGOOSE.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  locations: [pointSchema],
});

MONGOOSE.model("Track", trackSchema);
