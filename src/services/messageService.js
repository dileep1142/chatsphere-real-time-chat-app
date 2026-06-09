import axiosInstance from "../api/axiosConfig";

export const getMessagesByRoom = async (roomId) => {
  const response = await axiosInstance.get(`/messages/room/${roomId}`);
  return response.data;
};

export const sendMessage = async (roomId, content) => {
  const response = await axiosInstance.post("/messages/send", {
    roomId,
    content,
  });

  return response.data;
};