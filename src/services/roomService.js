import axiosInstance from "../api/axiosConfig";

export const getRooms = async () => {
  const response = await axiosInstance.get("/rooms");
  return response.data;
};

export const createRoom = async (roomName) => {
  const response = await axiosInstance.post("/rooms/create", {
    roomName,
  });

  return response.data;
};