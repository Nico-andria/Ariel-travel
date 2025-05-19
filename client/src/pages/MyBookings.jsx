import { useEffect, useState } from "react";
import axios from "axios";
// import Loader from "../_helpers/Loader";
import Swal from "sweetalert2";
import { Tag } from "antd";
import moment from "moment";
import { bookingService } from "../_services/booking.service";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import "../styles/booking.css";

import { DateTime } from "luxon";

const MyBookings = () => {
  const user = useSelector((state) => state.users);

  // const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [cancelIsLoading, setCancelIsLoading] = useState(false);
  const [error, setError] = useState();

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userId = user.user._id;
    console.log("User state:", user.user._id);
    if (!userId) return;

    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await bookingService.getBookingsByUserId({
          userId: user.user._id,
        });
        setBookings(response?.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchData();
  }, [user]);

  async function cancelBooking(bookingId, tourId) {
    try {
      setCancelIsLoading(true);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await (
        await axios.post(
          `${import.meta.env.VITE_API_URL}
          /bookings/cancelBooking`,
          {
            bookingId,
            tourId,
          },
          config
        )
      ).data;

      setCancelIsLoading(false);
      Swal.fire("Fait", "Votre réservation a bien été annulée", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      setLoading(false);
      setError("Erreur :", error);
      Swal.fire("Oops", "Il semble qu'il y ait eu une erreur", "error");
    }
  }
  return (
    <div>
      <div className="row m-5">
        {/* {loading && <Loader />} */}
        {loading && <p>Loading</p>}
        <h1>My Bookings</h1>
        <div className="col-md-12">
          {bookings.length === 0 && (
            <div className="alert alert-danger" role="alert">
              There is no booking in your name
            </div>
          )}
          {Array.isArray(bookings) &&
            bookings.map((booking, index) => {
              return (
                <div className="container mt-4 bs" key={index}>
                  <div className="card">
                    <div className="row no-gutters">
                      <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className="image-container d-flex justify-content-center align-items-center">
                          <img
                            src={`../src/assets/images${booking.tourId.photo}`}
                            className="card-img"
                            alt="Sample Image"
                            width={"50px"}
                          />
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="card-body">
                          <h2 className="card-title fw-semibold">
                            {booking.tourId.title}
                          </h2>
                          <p className="card-text">
                            Client :
                            <b>
                              {" "}
                              {user.user.firstName} {user.user.lastName}
                            </b>
                          </p>
                          <p>
                            Booking reference : <b>{booking._id}</b>
                          </p>
                          <p>
                            Starting Day :{" "}
                            <b>
                              {DateTime.fromISO(booking.bookAt)
                                .setLocale("en")
                                .toLocaleString(DateTime.DATE_HUGE)}
                            </b>{" "}
                            For {booking.tourId.timelines.length} days
                          </p>
                          <p>
                            Type of the reservation : <b>{booking.type}</b>
                          </p>
                          <p>
                            Guest size :{" "}
                            <b>
                              {booking.guestSize}{" "}
                              {booking.guestSize > 1 ? "persons" : "person"}
                            </b>
                          </p>
                          <p className="card-text text-center">
                            <small className="text-muted">
                              {booking.status !== "cancelled" ? (
                                booking.status === "paid" ? (
                                  <>
                                    <Tag color="green">PAID </Tag>
                                    <p>
                                      {" "}
                                      at{" "}
                                      {DateTime.fromISO(booking.createdAt)
                                        .setLocale("en")
                                        .toLocaleString(DateTime.DATE_HUGE)}
                                    </p>
                                  </>
                                ) : (
                                  <Tag color="orange">BOOKED</Tag>
                                )
                              ) : (
                                <Tag color="red">CANCELED</Tag>
                              )}
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-12 col-sm-12 pt-3">
                        <p className="text-center">
                          <b>
                            {booking.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                            $
                          </b>
                        </p>

                        <div
                          className="justify-content"
                          style={{ paddingRight: "15px" }}
                        >
                          {booking.status !== "cancelled" && (
                            <div className="text-right">
                              {!cancelIsLoading ? (
                                <Button
                                  className="tab-btn"
                                  style={{
                                    display:
                                      moment(booking.bookAt).diff(
                                        moment(),
                                        "days"
                                      ) < 5 && "none",
                                    // backgroundColor: "red",
                                    // color: "white",
                                  }}
                                  onClick={() => {
                                    cancelBooking(booking._id, booking.tourId);
                                  }}
                                >
                                  Cancel booking
                                </Button>
                              ) : (
                                <Button className="btn btn-secondary" disabled>
                                  <span className="spinner-border spinner-border-sm"></span>
                                  Cancelling...
                                </Button>
                              )}
                            </div>
                          )}

                          {/* {booking.status !== "btn btn-success" &&
                            booking.status !== "payed" && (
                              <div className="text-right">
                                <Link to={`/book/${booking._id}`}>
                                  <Button className="tab-btn">Pay Now</Button>
                                </Link>
                              </div>
                            )} */}
                        </div>
                      </div>
                    </div>

                    <div
                      className="alert alert-warning"
                      role="alert"
                      style={{
                        display:
                          DateTime.fromISO(booking.bookAt).diffNow("days")
                            .days >= 5 && "none",
                      }}
                    >
                      This booking can no longer be cancelled as it is already
                      included 5 days before your arrival.
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
