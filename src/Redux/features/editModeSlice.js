import { createSlice } from "@reduxjs/toolkit";

const editModeSlice = createSlice({
  name: "editMode",
  initialState: { value: false, song: {} },
  reducers: {
    onEditMode: (state, action) => {
      state.value = true;
      state.song = action.payload;
    },
    offEditMode: (state) => {
      state.value = false;
      state.song = {};
    },
  },
});

export const { onEditMode, offEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
