const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: book,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "booking not found" });
  }
};

exports.getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  const userId = req.body.userId;

  try {
    const bookings = await Booking.find({ userId: userId })
      .sort({
        createdAt: -1,
      })
      .populate("tourId");
    res.send({
      success: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

exports.cancelBooking = async (req, res) => {
  const { bookingId, tourId } = req.body;

  try {
    const bookingItem = await Booking.findOne({ _id: bookingId });
    bookingItem.status = "cancelled";
    await bookingItem.save();

    const tour = await Tour.findOne({ _id: tourId });

    const bookings = tour.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );
    tour.currentbookings = temp;
    await tour.save();
    res.send("This booking is cancelled successfully");
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

exports.payed = async (req, res) => {
  const { bookingId, tourId } = req.body;

  try {
    const bookingItem = await Booking.findOne({ _id: bookingId });
    bookingItem.status = "payed";
    await bookingItem.save();

    const tour = await Tour.findOne({ _id: tourId });

    const bookings = tour.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingId
    );
    tour.currentbookings = temp;
    await tour.save();
    res.send({ message: "Your booking is payed successfully", success: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

// stripe
exports.createCheckoutSession = async (req, res) => {
  const {
    amount,
    customerEmail,
    bookingId,
    tourName,
    photo,
    bookAt,
    guestSize,
    type,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount * 100, // Stripe attend des centimes
            product_data: {
              name: tourName,
              description: `Booking date: ${bookAt} and Guest size : ${guestSize}`,
              images: [photo], // Photo de la tour
            },
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      success_url: `${process.env.CLIENT_URL}/thank-you`,
      cancel_url: `${process.env.CLIENT_URL}/tours`,
      metadata: {
        userId: req.body.userId, // ID de l'utilisateur pour le webhook
        bookingId, // ID de la réservation pour le webhook
        tourId: req.body.tourId, // Tour ID pour le lien avec la tour
        title: tourName, // Titre de la réservation
        fullName: req.body.fullName, // Nom complet de l'utilisateur
        phoneNumber: req.body.phoneNumber, // Numéro de téléphone de l'utilisateur
        guestSize, // Nombre de personnes
        bookAt: req.body.bookAt, // Date de réservation
        type, // Type de réservation (normal/premium)
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log("Stripe checkout error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      //   req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    console.error("❌ Erreur de signature webhook:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement de session complétée
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Vérifier que le paiement est réussi
    if (session.payment_status !== "paid") {
      return res.status(400).json({ received: true, paid: false });
    }

    try {
      const booking = new Booking({
        userId: session.metadata.userId,
        userEmail: session.customer_email,
        tourId: session.metadata.tourId,
        tourName: session.metadata.title,
        fullName: session.metadata.fullName,
        guestSize: session.metadata.guestSize,
        phoneNumber: session.metadata.phoneNumber,
        bookAt: session.metadata.bookAt,
        type: session.metadata.type,
        price: session.amount_total / 100,
        status: "paid",
      });

      await booking.save();
      console.log("✅ Booking saved to DB:", booking);

      //   console.log("✅ Booking created:", booking);
      return res.status(200).json({ received: true, booking });
    } catch (error) {
      console.error("❌ Booking creation failed:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(200).json({ received: true });
};

/**
 * normal method
 */
// exports.createCheckoutSession = async (req, res) => {
//   const {
//     userId,
//     amount,
//     customerEmail,
//     bookingId,
//     tourName,
//     photo,
//     bookAt,
//     guestSize,
//     type,
//     tourId,
//     fullName,
//     phoneNumber,
//   } = req.body;

//   try {
//     // 1. Créer la session Stripe
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             unit_amount: amount * 100,
//             product_data: {
//               name: tourName,
//               description: `Booking ID: ${bookingId}`,
//               images: [photo],
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       customer_email: customerEmail,
//       success_url: `${process.env.CLIENT_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/tours`,
//       metadata: {
//         userId,
//         bookingId,
//         tourId,
//         tourName,
//         fullName,
//         phoneNumber,
//         guestSize,
//         bookAt,
//         type,
//       },
//     });

//     // 2. Sauvegarder la réservation IMMÉDIATEMENT (sans attendre le webhook)
//     // const booking = new Booking({
//     //   userId: userId,
//     //   userEmail: customerEmail,
//     //   tourId: tourId,
//     //   tourName: tourName,
//     //   fullName: fullName,
//     //   guestSize: guestSize,
//     //   phoneNumber: phoneNumber,
//     //   bookAt: bookAt,
//     //   type: type,
//     //   price: amount,
//     //   status: "paid",
//     //   stripeSessionId: session.id, // Stocker l'ID de session pour vérification ultérieure
//     // });

//     // await booking.save();
//     // console.log("📦 Booking saved (pending payment):", booking._id);

//     // 3. Renvoyer l'URL de paiement au frontend
//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error("❌ Stripe checkout error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.confirmPaymentAndCreateBooking = async (req, res) => {
//   const { sessionId } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status === "paid") {
//       const booking = new Booking({
//         userId: session.metadata.userId,
//         userEmail: session.customer_email,
//         tourId: session.metadata.tourId,
//         tourName: session.metadata.tourName,
//         fullName: session.metadata.fullName,
//         phoneNumber: session.metadata.phoneNumber,
//         guestSize: session.metadata.guestSize,
//         bookAt: session.metadata.bookAt,
//         type: session.metadata.type,
//         price: session.metadata.amount,
//         status: "paid",
//         stripeSessionId: session.id,
//       });

//       await booking.save();

//       res.status(201).json({ success: true, booking });
//     } else {
//       res.status(400).json({ error: "Payment not completed." });
//     }
//   } catch (err) {
//     console.error("❌ Error confirming payment:", err);
//     res.status(500).json({ error: "Something went wrong." });
//   }
// };
