import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

const songSlice = createSlice({
  name: "songs",
  initialState: { value: initialStateValue, isLoading: false },
  reducers: {
    getSongIdFetch: (state) => {
      state.isLoading = true;
    },

    getSongIdSuccess: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },

    getSongsFetch: (state) => {
      state.isLoading = true;
    },

    getSongsSuccess: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },

    addSong: (state) => {
      state.isLoading = true;
    },

    addSongSuccess: (state, action) => {
      state.value = [...state.value, action.payload];
      state.isLoading = false;
    },

    updateSongFetch: (state) => {
      state.isLoading = true;
    },

    updateSongSuccess: (state, action) => {
      // const index = state.value.findIndex(
      //   (song) => song.id === action.payload.id
      // );

      // state.value.splice(index, 1, action.payload);
      state.isLoading = false;
    },

    deleteSongFetch: (state) => {
      state.isLoading = true;
    },

    deleteSongSuccess: (state, action) => {
      state.value = state.value.filter((song) => song.id !== action.payload);
      state.isLoading = false;
    },
  },
});

export const {
  getSongIdFetch,
  getSongIdSuccess,
  getSongsFetch,
  getSongsSuccess,
  addSong,
  addSongSuccess,
  updateSongFetch,
  updateSongSuccess,
  deleteSongFetch,
  deleteSongSuccess,
} = songSlice.actions;

export default songSlice.reducer;
