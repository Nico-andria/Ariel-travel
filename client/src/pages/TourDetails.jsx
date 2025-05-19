import { useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
// import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
// import { AuthContext } from "../context/AuthContext";
import Timeline from "../components/Timeline/Timeline";
import BookingTab from "../components/Booking/BookingTab";
import { useSelector } from "react-redux";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const { user } = useSelector((state) => state.users);
  console.log(user);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    timelines,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      }
      const reviewObj = {
        userName: user?.userName,
        reviewText,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    // console.log(tour);
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  {/* <img src={`../src/assets/images${photo}`} alt="" /> */}

                  {/* Carousel */}
                  <div
                    id="demo"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    {/* <!-- Indicators/dots --> */}
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="0"
                        className="active"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide-to="2"
                      ></button>
                    </div>

                    {/* <!-- The slideshow/carousel --> */}
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src={`/images${photo}`}
                          //   src={`../src/assets/images${photo}`}
                          alt="Los Angeles"
                          className="d-block"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={`/images${photo}`}
                          //   src={`../src/assets/images${photo}`}
                          alt="Chicago"
                          className="d-block"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={`/images${photo}`}
                          //   src={`../src/assets/images${photo}`}
                          alt="New York"
                          className="d-block"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    {/* <!-- Left and right controls/icons --> */}
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#demo"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#demo"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                    </button>
                  </div>

                  {/* Carousel end */}

                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="f-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill">{address}</i>
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>$ {price}{" "}
                        / per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} persons
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  <div className="tour__timeline">
                    <h4>Timeline</h4>
                    <Timeline timelines={timelines} />
                  </div>

                  {/* tour reviews section  */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.lenght} reviews) </h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item" key={review._id}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.userName}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("fr-FR", options)}
                                </p>
                              </div>

                              <span className="d-flex align-items-center">
                                {review.rating}{" "}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* tour revienws section end */}
                </div>
              </Col>

              <Col lg="">
                <BookingTab tour={tour} avgRating={avgRating} />
                {/* <Booking tour={tour} avgRating={avgRating} /> */}
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
