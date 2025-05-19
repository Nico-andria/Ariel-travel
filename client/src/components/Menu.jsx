import { useState, useEffect } from "react";
import logo from "../assets/images/ariel/logo.png";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { accountService } from "../_services/account.service";
import { Logout } from "../redux/usersSlice";

const Menu = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  const logout = () => {
    accountService.logout();
    dispatch(Logout());
    window.location.href = "/";
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={
        scrolled
          ? "navbar navbar-expand-sm bg-light sticky-top text-dark"
          : "navbar navbar-expand-sm sticky-top"
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
                      <button className="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <button className="btn">
                <span>
                  <i className="ri-user-line"></i>
                </span>{" "}
                <a href="/login">Log in</a>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
