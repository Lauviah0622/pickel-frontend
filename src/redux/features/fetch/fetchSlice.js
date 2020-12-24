import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";

const statusSlice = createSlice({
  name: "useState",
  initialState: {
    isLoading: false,
    errMessage: "",
  },
  reducers: {
    /* eslint-disable */
    setError(state, { payload }) {
      state.isLoading = true;
      state.errMessage = payload;
    },
    resetError(state) {
      state.isLoading = false;
      state.errMessage = "";
    },
    /* eslint-enable */
  },
});

export default statusSlice.reducer;
export const { setError } = statusSlice.actions;


// TODOS: 記得加上 isLoading 的繞圈圈 UI
// eslint-disable-next-line no-unused-vars
export const createEventReq = (eventData) => async (dispatch) => {
  try {
    const createEventRes = await axios.post("event", eventData);
    if (!createEventRes.data.ok) throw Error('event Res Error');
    return Promise.resolve(createEventRes.data.data.event.eventSuffix)
  } catch (err) {
    if (!err.response) {
      dispatch(setError(err.message));
    }
    return Promise.reject(err)
  }
};
