import axios from "axios";

const Axios = axios.create({
  //   baseURL: "http://localhost:8800",
  baseURL: "https://happynice-back.onrender.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Axios;
