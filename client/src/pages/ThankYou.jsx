import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/thank-you.css";

const ThankYou = () => {
  // Méthode 1 : Avec React Router (recommandé si vous l'utilisez)
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sessionId = queryParams.get("session_id");

  // Méthode 2 : Sans React Router (vanilla JavaScript)
  // const queryParams = new URLSearchParams(window.location.search);
  // const sessionId = queryParams.get('session_id');

  useEffect(() => {
    const confirmBooking = async () => {
      if (sessionId) {
        try {
          const res = await axios.post("/api/booking/confirm", { sessionId });
          console.log("✅ Booking saved:", res.data.booking);
        } catch (err) {
          console.error("❌ Booking not saved:", err);
        }
      }
    };

    confirmBooking();
  }, [sessionId]);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank you</h1>
              <h3 className="mb-4">Your tour is booked.</h3>
              <div className="d-flex justify-content-center">
                <Button className="btn primary__btn w-25 justify-content-center">
                  <Link to="/my-bookings">My bookings</Link>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
