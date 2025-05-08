const Tour = require("../models/tourModel");

// create new tour
exports.createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(201).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
    });
  }
};

// update tour
exports.updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
    });
  }
};

// delete tour
exports.deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
    });
  }
};

// get Single tour
exports.getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Tour not found. Try again",
    });
  }
};

// get All tour
exports.getAllTours = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  console.log(page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully found",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Tour not found. Try again",
    });
  }
};

// get tour by search
exports.getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i"); // here 'i' means case sensitive

  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,

      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Tour not found. Try again",
    });
  }
};

// get feautured tour
exports.getFeaturedTours = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);
  console.log(page);
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully found",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Tour not found. Try again",
    });
  }
};

// get tour counts
exports.getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, data: "failed" });
  }
};

// ***************** ChatGPT ********************************************//

// Mise à jour d'un trajet spécifique dans la timeline
exports.updateTimeline = async (req, res) => {
  const tourId = req.params.id;
  const { day, description } = req.body; // Assurez-vous de recevoir "day" et "description" dans le corps de la requête

  try {
    // Trouver le tour par son ID
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Vérifier si le jour (day) existe déjà dans la timeline
    const timelineIndex = tour.timelines.findIndex((timeline) => timeline[day]);
    if (timelineIndex !== -1) {
      // Si le jour existe déjà, on met à jour la description
      tour.timelines[timelineIndex][day] = description;
    } else {
      // Sinon, on ajoute un nouvel élément dans la timeline
      tour.timelines.push({ [day]: description });
    }

    // Sauvegarder les modifications
    const updatedTour = await tour.save();
    res.status(200).json({
      success: true,
      message: "Timeline successfully updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update timeline. Try again",
      error: error.message,
    });
  }
};

// Supprimer un trajet spécifique de la timeline
exports.deleteTimeline = async (req, res) => {
  const tourId = req.params.id;
  const { day } = req.body; // Assurez-vous de recevoir le "day" dans le corps de la requête

  try {
    // Trouver le tour par son ID
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Trouver l'index du jour à supprimer dans la timeline
    const timelineIndex = tour.timelines.findIndex((timeline) => {
      // Vérifier si la Map contient la clé 'day'
      return timeline.has(day); // 'has' permet de vérifier si une clé existe dans la Map
    });
    if (timelineIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Timeline day not found",
      });
    }

    // Supprimer le jour spécifique de la timeline
    tour.timelines.splice(timelineIndex, 1);

    // Sauvegarder les modifications
    const updatedTour = await tour.save();
    res.status(200).json({
      success: true,
      message: "Timeline day successfully deleted",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete timeline day. Try again",
      error: error.message,
    });
  }
};

// Ajouter un trajet spécifique dans la timeline
exports.addTimeline = async (req, res) => {
  const tourId = req.params.id;
  const { day, description } = req.body; // Assurez-vous de recevoir "day" et "description" dans le corps de la requête

  try {
    // Trouver le tour par son ID
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Ajouter un nouveau jour dans la timeline
    tour.timelines.push({ [day]: description });

    // Sauvegarder les modifications
    const updatedTour = await tour.save();
    res.status(200).json({
      success: true,
      message: "Timeline day successfully added",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add timeline day. Try again",
      error: error.message,
    });
  }
};
