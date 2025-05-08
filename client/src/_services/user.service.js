import Axios from "./caller.service";

let getAllUsers = async () => {
  try {
    const { data } = await Axios.get("/api/users/utilisateurs");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

let getUser = async (uid) => {
  try {
    const { data } = await Axios.get("/api/users/" + uid);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
let getUserById = async (uid) => {
  try {
    const { data } = await Axios.get("/api/users/getUserById/" + uid);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

let getMyInfo = async () => {
  try {
    const { data } = await Axios.get("/api/users/myProfile");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const userService = {
  getAllUsers,
  getUser,
  getMyInfo,
};
