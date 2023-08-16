import { createSlice } from "@reduxjs/toolkit";
import { updateSong } from "../../api";

const initialStateValue = [{ name: "leul" }];

const songSlice = createSlice({
  name: "songs",
  initialState: { value: initialStateValue },
  reducers: {
    fetchSongSuccess: (state, action) => {
      return action.payload;
    },
    addSongSuccess: (state, action) => {
      state.push(action.payload);
    },
    updateSongSuccess: (state, action) => {
      // TODO: write a code
    },
    deleteSongSuccess: (state, action) => {
      return state.filter((song) => song.id !== action.payload);
    },
  },
});

export const {
  fetchSongSuccess,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} = songSlice.actions;

export default songSlice.reducer;
