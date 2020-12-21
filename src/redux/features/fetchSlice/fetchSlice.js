import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";

const statusSlice = createSlice({
  name: "useState",
  initialState: {
    isLoading: false,
    errMessage: "",
  },
  reducers: {
    setError(state, { payload }) {
      // eslint-disable-next-line
      state.isLoading = true;
      state.errMessage = payload;
    },
    resetError(state) {
      state.isLoading = false;
      state.errMessage = "";
    },
  },
});

export default statusSlice.reducer;
export const { setError } = statusSlice.actions;

export const createEventReq = (eventData) => async (dispatch) => {
  try {
    if (eventData.name.length === 0) throw Error();
    const createEventRes = await axios.post("event", eventData);
    console.log(createEventRes);
  } catch (err) {
    if (!err.response) {
      setError(err.message);
    }
    console.log(err.response);
  }
};
