import Header from "../components/Header";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";

import about1 from "../assets/images/ariel/about-1.jpg";
import about2 from "../assets/images/ariel/about-2.jpg";
import about3 from "../assets/images/ariel/about-3.jpg";

import Subtitle from "../shared/Subtitle";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import GalleryImages from "../components/Image-gallery/GalleryImages";

const Home = () => {
  return (
    <>
      <Header />

      <section className="services__section">
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>

            <ServiceList />
          </Row>
        </Container>
      </section>

      <section className="about">
        <div className="section__container about__container">
          <div className="about__image about__image-1" id="about">
            <img src={about1} alt="about" />
          </div>
          <div className="about__content about__content-1">
            <h3 className="section__subheader">
              Tarif variable selon les saisons
            </h3>
            <h2 className="section__header">Organized trip</h2>
            <p>
              Whether you are a novice seeking scenic strolls or an experienced
              trekker craving challenging ascents, we have curated a diverse
              range of trails to cater to every adventurer. Uncover your hiking
              identity, explore tailored recommendations, and embrace the great
              outdoors with a newfound understanding of your capabilities.
            </p>
            <div className="about__btn">
              <a href="#">
                More details
                <span>
                  <i className="ri-arrow-right-line"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="about__image about__image-2" id="equipment">
            <img src={about2} alt="about" />
          </div>
          <div className="about__content about__content-2">
            <h3 className="section__subheader">Minimum 4 persons</h3>
            <h2 className="section__header">Private holidays</h2>
            <p>
              From durable footwear that conquers rugged trails to lightweight
              backpacks that carry your essentials with ease, we navigate the
              intricacies of gear selection to ensure you are geared up for
              success on every hike. Lace up your boots and let the journey
              begin with confidence, knowing youhave chosen the right gear for
              the trail ahead!
            </p>
            <div className="about__btn">
              <a href="#">
                More details
                <span>
                  <i className="ri-arrow-right-line"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="about__image about__image-3" id="blog">
            <img src={about3} alt="about" />
          </div>
          <div className="about__content about__content-3">
            <h3 className="section__subheader">Minimum 4 personnes</h3>
            <h2 className="section__header">Voyage personnalisé</h2>
            <p>
              Knowing when to start and anticipating the changing conditions
              ensures a safe and enjoyable journey. So, dive into the details,
              grasp the contours, and synchronize your steps with the rhythm of
              nature. It is not just a hike; it is a journey orchestrated by
              your map and timed to perfection.
            </p>
            <div className="about__btn">
              <a href="#">
                More details
                <span>
                  <i className="ri-arrow-right-line"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* featured tour section start */}
      <section className="featured__tours">
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* featured tour section end */}

      {/* gallery section start */}
      <section className="gallery">
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
              {/* <MasonryImagesGallery /> */}
              <GalleryImages />
            </Col>
          </Row>
        </Container>
      </section>
      {/* gallery section end */}

      {/* testimonial section start */}
      {/* <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section> */}
      {/* testimonial section end */}
    </>
  );
};

export default Home;
