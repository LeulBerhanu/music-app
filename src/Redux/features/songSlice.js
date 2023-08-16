import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const songSlice = createSlice({
  name: "songs",
  initialState: { value: initialStateValue },
  reducers: {
    getSongFetch: (state) => {
      console.log("fetching...");
    },
    getSongSuccess: (state, action) => {
      state.value = action.payload;
      console.log("not fetching anymore!!!");
    },

    addSong: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    updateSong: (state, action) => {
      // TODO: write a code
    },

    deleteSong: (state, action) => {
      return state.filter((song) => song.id !== action.payload);
    },
  },
});

export const { getSongFetch, getSongSuccess, addSong, updateSong, deleteSong } =
  songSlice.actions;

export default songSlice.reducer;
