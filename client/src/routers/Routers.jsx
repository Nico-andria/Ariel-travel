import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import TourDetails from "../pages/TourDetails";
import Timeline from "../components/Timeline/Timeline";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import MyBookings from "../pages/MyBookings";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/search" element={<SearchResultList />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
