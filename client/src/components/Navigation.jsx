import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { accountService } from "../_services/account.service";
import "./navbar.css";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(location.pathname === "/");
  const { user } = useSelector((state) => state.users);

  const [menuRight, setMenuRight] = useState([]);
  useEffect(() => {
    // Mettez à jour isHome lorsque la route change
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  const publicMenu = [
    {
      title: "Home",
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Tours",
      onClick: () => navigate("/tours"),
      path: "/tours",
    },
    {
      title: "About us",
      onClick: () => navigate("/about"),
      path: "/about",
    },
  ];

  useEffect(() => {
    if (!user) {
      console.log(true);
      setMenuRight([
        {
          title: "Log in",
          onClick: () => navigate("/login"),
          path: "/login",
        },
        {
          title: "S'enregistrer",
          onClick: () => navigate("/register"),
          path: "/register",
        },
      ]);
    } else {
      console.log(false);
      setMenuRight([
        {
          title: "My reservations",
          onClick: () => navigate("/mesreservations"),
          path: "/mesreservations",
        },
        {
          title: "Logout",
          onClick: () => {
            accountService.logout();
            //navigate("/login");
            window.location.href = "/login";
          },
          //path: "/logout",
        },
      ]);
    }
  }, [user]);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className={`sticky-top  ${isHome ? "" : "header-black"}`}>
      <ul className={menuOpen ? "open" : ""}>
        {publicMenu.map((item, index) => {
          const isActive = window.location.pathname === item.path;
          return (
            <li key={index}>
              <NavLink
                to={item.path}
                className={`${isActive ? "selected" : ""}`}
                onClick={item.onClick}
                style={{ marginRight: "10px;" }}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <>
          {menuRight.map((item, index) => {
            const isActive = window.location.pathname === item.path;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={`${isActive ? "selected" : ""}`}
                  onClick={item.onClick}
                  style={{ marginRight: "10px;" }}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </>
      </ul>
    </nav>
  );
};

export default Navigation;
