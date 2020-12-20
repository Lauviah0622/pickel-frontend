import { createSlice } from "@reduxjs/toolkit";

const pickSlice = createSlice({
  name: "pickState",
  initialState: {
    event: null,
  },
  reducers: {
    setPickData(state, { payload }) {
      // eslint-disable-next-line
      state.pick = payload;
    },
  },
});

export default pickSlice.reducer;
export const { setEventData } = pickSlice.actions;