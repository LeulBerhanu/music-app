import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000`;
// axios.defaults.baseURL = `https://my-json-server.typicode.com/LeulBerhanu/jsonServer`;

export const getSongsApi = () => axios.get(`/songs`);
export const getSongApi = (id) => axios.get(`/songs/${id}`);
export const createSongApi = (data) => axios.post(`/songs`, data);
export const updateSongApi = (id, data) => axios.put(`/songs/${id}`, data);
export const deleteSongApi = (id) => axios.delete(`/songs/${id}`);
