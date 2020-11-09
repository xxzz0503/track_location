const MONGOOSE = require("mongoose");

const connection = () => {
  const mongoUri =
    "mongodb+srv://admin:admin@cluster0.5jirv.mongodb.net/test?retryWrites=true&w=majority";
  MONGOOSE.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  MONGOOSE.connection.on("connected", () => {
    console.log("Connected to mongo instance");
  });
  MONGOOSE.connection.on("error", (e) => {
    console.error("Error connecting to mongo", e);
  });
  return MONGOOSE;
};

module.exports = { connection };
