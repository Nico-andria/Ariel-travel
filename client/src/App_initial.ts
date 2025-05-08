import { useDispatch } from "react-redux";
import "./App.css";
import Layout from "./components/Layout";
import { SetUser } from "./redux/usersSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function App_initial() {
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
      <Layout />
    </>
  );
}

export default App_initial;
