import { useState, useEffect, useContext } from "react";
import logo from "../assets/images/ariel/logo.png";
import "../styles/navbar.css";
import { Button } from "reactstrap";
// import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  // Fonction pour changer la couleur de la navbar lors du scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });

    window.location.href("/");
  };

  useEffect(() => {
    // Ajout de l'écouteur d'événements lors du montage du composant
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <nav className="navbar navbar-expand-sm sticky-top" > */}
      <nav className={scrolled ? "navbar-scrolled" : ""}>
        <div className="navbar navbar-expand-sm sticky-top">
          <div className="logo nav__logo">
            <a href="/">
              <img src={logo} alt="Ariel" width="100px" />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tours">
                  Tours
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            {user ? (
              <>
                {/* <h5 className="mb-0">{user.username}</h5> */}
                <Button className="btn btn-dark">{user.username}</Button>
                <Button className="btn btn-dark" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <button className="btn">
                  <span>
                    <i className="ri-user-line"></i>
                  </span>{" "}
                  <a href="/login">My Account</a>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
