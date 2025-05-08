const express = require("express");
const BookingController = require("../controllers/BookingController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");
// const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyUser, BookingController.createBooking);
router.get("/:id", verifyUser, BookingController.getBooking);
router.get("/", verifyAdmin, BookingController.getAllBooking);
router.post(
  "/getBookingsByUserId",
  verifyUser,
  BookingController.getBookingsByUserId
);
router.post("/cancelBooking", verifyUser, BookingController.cancelBooking);
router.post("/payed", verifyUser, BookingController.payed);

router.post(
  "/checkout-session",
  verifyUser,
  BookingController.createCheckoutSession
);
// router.post("/webhook", verifyUser, BookingController.stripeWebhook);
// router.post(
//   "/confirm",
//   verifyUser,
//   BookingController.confirmPaymentAndCreateBooking
// );

module.exports = router;
