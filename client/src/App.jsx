import { useDispatch } from "react-redux";
import "./App.css";
// import Layout from "./components/Layout";
import { SetUser } from "./redux/usersSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Tours from "./pages/Tours";
import SearchResultList from "./pages/SearchResultList";
import ThankYou from "./pages/ThankYou";
import TourDetails from "./pages/TourDetails";
import Timeline from "./components/Timeline/Timeline";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import MyBookings from "./pages/MyBookings";
import PublicRoutes from "../src/routers/PublicRoutes";
import PrivateRoutes from "../src/routers/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        fetch(`${import.meta.env.VITE_API_URL}/users/getUserById/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            dispatch(SetUser(data));
          })
          .catch((err) => {
            console.error("Erreur lors de la récupération du user :", err);
          });
      } catch (err) {
        console.error("Token invalide :", err);
      }
    }
  }, [dispatch]);

  return (
    <>
      {/* <Layout /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Home />
              </PublicRoutes>
            }
          />
          <Route
            path="/tours"
            element={
              <PublicRoutes>
                <Tours />
              </PublicRoutes>
            }
          />
          <Route
            path="/tour/:id"
            element={
              <PublicRoutes>
                <TourDetails />
              </PublicRoutes>
            }
          />
          <Route
            path="/search"
            element={
              <PublicRoutes>
                <SearchResultList />
              </PublicRoutes>
            }
          />
          <Route
            path="/thank-you"
            element={
              <PublicRoutes>
                <ThankYou />
              </PublicRoutes>
            }
          />
          <Route
            path="/timeline"
            element={
              <PublicRoutes>
                <Timeline />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoutes>
                <About />
              </PublicRoutes>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <PrivateRoutes>
                <MyBookings />
              </PrivateRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
