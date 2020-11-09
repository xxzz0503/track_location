const mongoose = require("mongoose");
const BCRYPT = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  // using function instead of () => {} because we'll use "this" keyword
  // Using function "this" => refer to which user call "save" function,
  // Using () => {} "this" => context of User.js
  const user = this;
  // check if password of user has been modified or not
  if (!user.isModified("password")) {
    // if not don't try to salt anything
    return next();
  }

  // Use bcrypt library to gen salt
  // 10 refer to how complex the salt is that we're going to generate
  BCRYPT.genSalt(10, (e, salt) => {
    if (e) {
      return next(e);
    }
    // if gen salt successfully => return random string of char use to prevent rainbow table attack.
    // after has salt we're going to hash the combine string of "user.password" and "salt"
    // => return "hash" is a string of char
    // after that we're going to assign that "hash" to "user.password"
    BCRYPT.hash(user.password, salt, (e, hash) => {
      if (e) {
        return next(e);
      }
      // update password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    BCRYPT.compare(candidatePassword, user.password, (e, isMatch) => {
      if (e) {
        return reject(e);
      }
      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
