import axios from "axios";

// const URL = `https://64dc7c1be64a8525a0f68fd5.mockapi.io`;
const URL = `http://localhost:3000`;

export const getSongsApi = () => axios.get(`${URL}/songs`);
export const createSongApi = (data) => axios.post(`${URL}/songs`, data);
export const updateSongApi = (id, data) =>
  axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteSongApi = (id) => axios.delete(`${URL}/songs/${id}`);
