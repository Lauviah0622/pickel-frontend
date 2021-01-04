import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "statusState",
  initialState: {
    status: null, // client, launcher, picker
  },
  reducers: {
    setStatus(state, { payload }) {
      // eslint-disable-next-line
      state.status = payload;
    },
  },
});



export default statusSlice.reducer;
export const { setStatus } = statusSlice.actions;

export const cleanStatus = () => (disptach) => {
  disptach(setStatus(null))
}
