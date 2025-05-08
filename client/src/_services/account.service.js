import Axios from "./caller.service";

let login = async (payload) => {
  try {
    const { data } = await Axios.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

let register = async (payload) => {
  try {
    const { data } = await Axios.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

let forgottenPassword = ({ email, redirectUrl = "" }) => {
  try {
    const { data } = Axios.post("/api/users/requestPasswordReset", {
      email,
      redirectUrl,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
let resetPassword = (payload) => {
  try {
    const { data } = Axios.post("/api/users/resetPassword", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const accountService = {
  login,
  register,
  saveToken,
  logout,
  isLogged,
  forgottenPassword,
  resetPassword,
};
