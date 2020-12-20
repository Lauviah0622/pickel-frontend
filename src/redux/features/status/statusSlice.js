import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "useState",
  initialState: {
    status: 'client', // client, launcher, picker
  },
  reducers: {
    setStatusData(state, { payload }) {
      // eslint-disable-next-line
      state.status = payload;
    },
  },
});

export default statusSlice.reducer;
export const { setStatusData } = statusSlice.actions;
