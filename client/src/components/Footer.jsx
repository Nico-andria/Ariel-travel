import logo from "../assets/images/ariel/logo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="logo footer__logo">
            <img src={logo} alt="Ariel" width="100px" />
          </div>
          <p>Live a new experience with our tour operator</p>
        </div>
        <div className="footer__col">
          <h4>About us</h4>
          <ul className="footer__links">
            <li>
              <a href="#">Our Team</a>
            </li>
            <li>
              <a href="/tours">Our destinations</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Our Services</h4>
          <ul className="footer__links">
            <li>
              <a href="#">Luxury journey</a>
            </li>
            <li>
              <a href="#">Private journey</a>
            </li>
            <li>
              <a href="#">Group journey</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bar">
        Copyright © 2024 Nico. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
