import MiavanaVideo from "../assets/images/ariel/Miavana.mp4";
import SearchBar from "../shared/SearchBar";
// import logoBlanc from "../assets/images/logo_blanc.png";
import { Container, Row, Col } from "reactstrap";
import "../styles/header.css";
const Header = () => {
  return (
    <header className="header" id="home">
      <video autoPlay loop muted playsInline className="background__video">
        <source src={MiavanaVideo} type="video/mp4" />
      </video>
      <div className="section__container header__container">
        <div className="header__content">
          <h3 className="section__subheader">Ariel</h3>
          <h1 className="section__header">
            {/* <img src={logoBlanc} alt="" width={200} /> */}
            Luxury Travel
          </h1>
          <div className="scroll__btn">
            <a href="#about">
              Scroll
              <span>
                <i className="ri-arrow-down-line"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="header__socials">
          <span>Follow us</span>
          <a href="#">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="#">
            <i className="ri-twitter-fill"></i>
          </a>
        </div>
      </div>
      {/* <!-- Booking container --> */}
      <section className="searchbar__container">
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* <!-- end booking container --> */}
    </header>
  );
};

export default Header;
