import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:8800",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Axios;
