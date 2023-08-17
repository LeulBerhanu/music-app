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
      console.log("adding song ...");
    },

    addSongSuccess: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    updateSong: (state, action) => {
      // TODO: write a code
    },

    deleteSongFetch: (state, action) => {
      console.log("Fetching to delete ...");
    },

    deleteSongSuccess: (state, action) => {
      state.value = state.value.filter((song) => song.id !== action.payload);
    },
  },
});

export const {
  getSongFetch,
  getSongSuccess,
  addSong,
  addSongSuccess,
  updateSong,
  deleteSongFetch,
  deleteSongSuccess,
} = songSlice.actions;

export default songSlice.reducer;
