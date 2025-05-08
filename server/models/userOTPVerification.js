const mongoose = require("mongoose");

const userOTPVerificationSchema = mongoose.Schema(
  {
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// le premier paramètre, c'est le nom de la collection, le 2e c'est le schéma qu'on vient de créer
const userOTPVerification = mongoose.model(
  "userOTPVerification",
  userOTPVerificationSchema
);

module.exports = userOTPVerification;
