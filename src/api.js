import axios from "axios";

const URL = `https://my-json-server.typicode.com/LeulBerhanu/songsDb`;

export const getSongs = () => axios.get(`${URL}/posts`);
export const updateSong = (id, data) =>
  axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteSong = (id) => axios.delete(`${BASE_URL}/users/${id}`);
