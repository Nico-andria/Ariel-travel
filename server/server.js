const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const connection = require("./db");
const app = express();

// ⚠️ Webhook Stripe : avant express.json
const { stripeWebhook } = require("./controllers/BookingController");

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

const corsOptions = {
  origin: true,
  //   origin: "http://localhost:5173/",
  credentials: true,
};

const tourRoute = require("./routes/toursRoute");
const userRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");
const reviewRoute = require("./routes/reviewsRoute");
const bookingRoute = require("./routes/bookingRoute");

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/tours", tourRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/review", reviewRoute);
app.use("/api/booking", bookingRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
