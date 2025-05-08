import Axios from "./caller.service";

let getAllRooms = async () => {
  try {
    const { data } = await Axios.get("/api/rooms/getAllRooms");
    return data;
  } catch (error) {
    return error.response.rooms;
  }
};

let getRoomById = async (roomId) => {
  try {
    const { data } = await Axios.get(`/api/rooms/getRoomById/${roomId} `);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const roomService = {
  getAllRooms,
  getRoomById,
};
