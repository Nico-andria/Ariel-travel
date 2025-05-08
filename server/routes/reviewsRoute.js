const express = require("express");
const ReviewsController = require("../controllers/ReviewsController");
const { verifyUser } = require("../utils/verifyToken");

const router = express.Router();

router.post("/:tourId", verifyUser, ReviewsController.createReview);

module.exports = router;
