import axios from "axios";

const URL = `https://64dc7c1be64a8525a0f68fd5.mockapi.io`;

export const getSongs = () => axios.get(`${URL}/songs`);
export const createSong = (data) => axios.post(`${URL}/songs`, data);
export const updateSong = (id, data) =>
  axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteSong = (id) => axios.delete(`${BASE_URL}/users/${id}`);
