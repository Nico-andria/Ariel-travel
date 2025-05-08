const mongoose = require("mongoose");

const resetPasswordSchema = mongoose.Schema(
  {
    userId: String,
    resetString: String,
    createdAt: Date,
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

// le premier paramètre, c'est le nom de la collection, le 2e c'est le schéma qu'on vient de créer
const resetPassword = mongoose.model("resetPassword", resetPasswordSchema);

module.exports = resetPassword;
