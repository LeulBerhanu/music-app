import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

const songSlice = createSlice({
  name: "song",
  initialState: { value: initialStateValue },
  reducers: {}, // TODO add reducer here.
});

export default songSlice.reducer;
