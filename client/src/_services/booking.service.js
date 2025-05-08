import Axios from "./caller.service";

let bookRoom = async (payload) => {
  try {
    const { data } = await Axios.post("/api/booking/bookRoom", payload);
    return data;
  } catch (error) {
    return error.message;
  }
};
let getBookingsByUserId = async (payload) => {
  try {
    const { data } = await Axios.post(
      "/api/booking/getBookingsByUserId",
      payload
    );
    return data;
  } catch (error) {
    return error.message;
  }
};
let getBookById = async (payload) => {
  try {
    const { data } = await Axios.get("/api/booking/getBookById/" + payload);
    return data;
  } catch (error) {
    return error.message;
  }
};

export const bookingService = {
  bookRoom,
  getBookingsByUserId,
  getBookById,
};
