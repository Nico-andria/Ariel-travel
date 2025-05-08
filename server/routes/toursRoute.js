const express = require("express");

const router = express.Router();

const tourController = require("../controllers/TourController");
const { verifyAdmin } = require("../utils/verifyToken");

router.post("/", verifyAdmin, tourController.createTour);
router.put("/:id", verifyAdmin, tourController.updateTour);
router.delete("/:id", verifyAdmin, tourController.deleteTour);
router.get("/:id", tourController.getSingleTour);
router.get("/", tourController.getAllTours);
router.get("/search/getTourBySearch", tourController.getTourBySearch);
router.get("/search/getFeaturedTours", tourController.getFeaturedTours);
router.get("/search/getTourCount", tourController.getTourCount);

// Route pour mettre à jour un trajet dans la timeline
router.put("/:id/timeline", verifyAdmin, tourController.updateTimeline);

// Route pour ajouter un nouveau trajet dans la timeline
router.post("/:id/timeline", verifyAdmin, tourController.addTimeline);

// Route pour supprimer un trajet dans la timeline
router.delete("/:id/timeline", verifyAdmin, tourController.deleteTimeline);

module.exports = router;
