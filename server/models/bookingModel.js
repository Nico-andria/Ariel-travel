const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    tourId: {
      //type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    userId: {
      //   type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      // required: true,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "payed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
