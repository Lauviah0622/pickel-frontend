import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { setEvent } from "../event/eventSlice";
import { setStatusData } from "../status/statusSlice";
import { getEventState } from '../../../utils';

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

// TODO: 記得加上 isLoading 的繞圈圈 UI
// eslint-disable-next-line no-unused-vars
export const createEventReq = (eventData) => async (dispatch) => {
  try {
    const createEventRes = await axios.post("event", eventData);
    if (!createEventRes.data.ok) throw Error("event Res Error");
    return Promise.resolve(createEventRes.data.data.event.eventSuffix);
  } catch (err) {
    if (!err.response) {
      dispatch(setError(err.message));
    }
    return Promise.reject(err);
  }
};

export const fetchEvent = (suffix) => async (dispatch) => {
  try {
    const getEventRes = await axios.get(`event/${suffix}`);
    if (!getEventRes.data.ok) throw Error("getEvent Res Error");
    dispatch(setStatusData("launcher"));
    dispatch(setEvent(getEventRes.data.data.event));
    console.log(getEventState(getEventRes.data.data.event));
  } catch (err) {
    console.log(err.message);
  }
};
