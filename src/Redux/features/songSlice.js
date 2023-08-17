import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const songSlice = createSlice({
  name: "songs",
  initialState: { value: initialStateValue, isLoading: false },
  reducers: {
    getSongFetch: (state) => {
      state.isLoading = true;
    },
    getSongSuccess: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
      console.log("not fetching anymore!!!");
    },

    addSong: (state) => {
      console.log("adding song ...");
      state.isLoading = true;
    },

    addSongSuccess: (state, action) => {
      state.value = [...state.value, action.payload];
      state.isLoading = false;
    },

    updateSongFetch: (state) => {
      console.log("updating ... ");
      state.isLoading = true;
    },

    updateSongSuccess: (state, action) => {
      const index = state.value.findIndex(
        (song) => song.id === action.payload.id
      );

      state.value.splice(index, 1, action.payload);
      state.isLoading = false;

      console.log("updated");
    },

    deleteSongFetch: (state, action) => {
      console.log("Fetching to delete ...");
      state.isLoading = true;
    },

    deleteSongSuccess: (state, action) => {
      state.value = state.value.filter((song) => song.id !== action.payload);
      state.isLoading = false;
    },
  },
});

export const {
  getSongFetch,
  getSongSuccess,
  addSong,
  addSongSuccess,
  updateSongFetch,
  updateSongSuccess,
  deleteSongFetch,
  deleteSongSuccess,
} = songSlice.actions;

export default songSlice.reducer;
