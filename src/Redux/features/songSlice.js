import { createSlice } from "@reduxjs/toolkit";
import { updateSong } from "../../api";

const initialStateValue = [];

const songSlice = createSlice({
  name: "songs",
  initialState: { value: initialStateValue },
  reducers: {
    getSongFetch: (state) => {
      // return state;
      console.log("fetching...");
    },
    getSongSuccess: (state, action) => {
      state.value = action.payload;
      console.log("not fetching anymore!!!");
      // console.log(action.payload);
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
  getSongFetch,
  getSongSuccess,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} = songSlice.actions;

export default songSlice.reducer;
