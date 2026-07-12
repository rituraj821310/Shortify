import axios from "axios";

const API = "https://shortify-backend-kq04.onrender.com/api/create";

// Create Short URL
export const shortenUrl = async (url) => {
  const response = await axios.post(
    API,
    { url },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

// Get Logged-in User History
export const getHistory = async () => {
  const response = await axios.get(`${API}/history`, {
    withCredentials: true,
  });

  return response.data;
};

// Delete URL
export const deleteUrl = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });

  return response.data;
};