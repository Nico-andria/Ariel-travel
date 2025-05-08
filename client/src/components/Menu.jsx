import { useState, useEffect, useContext } from "react";
import logo from "../assets/images/ariel/logo.png";
import "../styles/navbar.css";
import { Button } from "reactstrap";
// import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { accountService } from "../_services/account.service";
const Menu = () => {
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
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
    accountService.logout().then((response) => {
      if (response.success) {
        // Dispatch pour mettre à jour le context avec les données utilisateur
        dispatch({ type: "LOGOUT" });
        // Redirige vers la page d'accueil
        window.location.href = "/";
      } else {
        console.log(response.message);
      }
    });
  };

  useEffect(() => {
    // Ajout de l'écouteur d'événements lors du montage du composant
    window.addEventListener("scroll", handleScroll);

    // Nettoyage de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <nav
      className={
        !scrolled
          ? "navbar navbar-expand-sm sticky-top"
          : "navbar navbar-expand-sm bg-light sticky-top text-dark"
      }
    >
      <div className="container-fluid">
        <a href="/" className="navbar-brand ml-5">
          <img src={logo} alt="Ariel" width="100px" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="collapsibleNavbar"
        >
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
          <div className="d-flex">
            {user ? (
              <>
                {/* <h5 className="mb-0">{user.username}</h5> */}
                {/* <Button className="btn btn-dark">{user.username}</Button>
                <Button className="btn btn-dark" onClick={logout}>
                  Logout
                </Button> */}
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      My Account
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          My profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/my-bookings">
                          My bookings
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="">
                          <Button className="tab-btn" onClick={logout}>
                            Logout
                          </Button>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <button className="btn">
                  <span>
                    <i className="ri-user-line"></i>
                  </span>{" "}
                  <a href="/login">Log in</a>
                </button>
              </>
            )}
          </div>
          {/* <div className="d-flex">
            <button className="btn">
              <span>
                <i className="ri-user-line"></i>
              </span>{" "}
              <a href="/login">My Account</a>
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
