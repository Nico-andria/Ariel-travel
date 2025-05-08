const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      //isAdmin
      type: String,
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// le premier paramètre, c'est le nom de la collection, le 2e c'est le schéma qu'on vient de créer
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
