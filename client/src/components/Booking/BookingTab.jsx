import { useContext, useEffect, useState } from "react";
import "../../styles/booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const BookingTab = ({ tour, avgRating }) => {
  // Variables récupérées du tour
  const { _id, price, pricePremium, reviews, title, bookAt, photo } = tour;
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.users);
  const token = localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(false);

  // Initialisation de l'état de réservation
  const [booking, setBooking] = useState({
    tourId: _id,
    userId: "",
    userEmail: "",
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  // Gestion des onglets (normal / premium)
  const [activeTab, setActiveTab] = useState("normal"); // Onglet actif
  const serviceFee = 10;
  const totalAmount =
    activeTab === "normal"
      ? Number(price) * Number(booking.guestSize) + Number(serviceFee)
      : Number(pricePremium) * Number(booking.guestSize) + Number(serviceFee);

  useEffect(() => {
    if (user) {
      setBooking((prev) => ({
        ...prev,
        userId: user._id,
        userEmail: user.email,
        fullName: user.lastName,
        phoneNumber: user.phoneNumber,
        price: totalAmount,
      }));
    }
  }, [user]);

  useEffect(() => {
    console.log(tour);
  }, []);

  // Changement dans le formulaire
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const selectedPrice =
      activeTab === "normal" ? Number(price) : Number(pricePremium);
    const finalPrice = selectedPrice * Number(booking.guestSize) + serviceFee;

    const selectedType = activeTab === "normal" ? "normal" : "premium";
    try {
      setIsLoading(true);
      // On envoie juste les infos à Stripe pour créer la session
      const stripeSession = await fetch(
        `${import.meta.env.VITE_API_URL}/booking/checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user._id,
            tourId: _id,
            amount: finalPrice,
            customerEmail: user.email,
            tourName: title,
            fullName: user.lastName,
            guestSize: booking.guestSize,
            phoneNumber: user.phoneNumber,
            bookAt: booking.bookAt,
            type: selectedType,
            photo: `http://localhost:5173/src/assets/images/${tour.photo}`,
          }),
        }
      );

      const sessionData = await stripeSession.json();

      if (!stripeSession.ok) {
        throw new Error("Erreur Stripe : impossible de créer la session");
      }
      setIsLoading(false);

      // Redirection vers Stripe
      window.location.href = sessionData.url;
    } catch (error) {
      console.error(error.message);
      alert("Une erreur est survenue lors du paiement.");
      setIsLoading(false);
    }
  };

  // Fonction pour changer l'onglet actif
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Mise à jour du prix lorsque l'onglet change
    setBooking((prev) => ({
      ...prev,
      price: tab === "normal" ? price : pricePremium,
      //   price: totalAmount,
    }));
  };

  return (
    <div className="booking">
      {/* Onglets pour choisir entre "normal" et "premium" */}
      <div className="tabs d-flex gap-3 mb-4">
        <Button
          className={`tab-btn ${activeTab === "normal" ? "active" : ""}`}
          onClick={() => handleTabChange("normal")}
        >
          Normal
        </Button>
        <Button
          className={`tab-btn ${activeTab === "premium" ? "active" : ""}`}
          onClick={() => handleTabChange("premium")}
        >
          Premium
        </Button>
      </div>
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${activeTab === "normal" ? price : pricePremium}{" "}
          <span>/per person</span>{" "}
        </h3>

        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}{" "}
          ({reviews?.length})
        </span>
      </div>

      {/* Formulaire de réservation */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name "
              id="fullName"
              required
              onChange={handleChange}
              value={user?.lastName}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="email"
              placeholder="Email address "
              id="email"
              required
              onChange={handleChange}
              value={user?.email}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone Number"
              id="phone"
              required
              onChange={handleChange}
              value={user?.phoneNumber}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Détails de la réservation */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${activeTab === "normal" ? price : pricePremium}{" "}
              <i className="ri-close-line"></i> {booking.guestSize} person
            </h5>
            <span>{activeTab === "normal" ? price : pricePremium}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>$ {serviceFee} </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>$ {totalAmount} </span>
          </ListGroupItem>
        </ListGroup>

        {isLoading ? (
          <Button
            className="justify-content-center btn btn-secondary w-100 mt-4"
            onClick={handleClick}
            disabled
            style={{ cursor: "not-allowed" }}
          >
            Booking...
          </Button>
        ) : (
          <Button
            className="justify-content-center btn primary__btn w-100 mt-4"
            onClick={handleClick}
          >
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingTab;
