import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { setEvent, setEventState } from "../event/eventSlice";
import { setStatus } from "../status/statusSlice";
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
export const createEventReq = (eventData) => async (dispatch, getState) => {
  try {
    const {event} = getState().eventState;
    const createEventRes = await axios.post("event", event);
    if (!createEventRes.data.ok) throw Error("event Res Error");
    
    return Promise.resolve(createEventRes.data.data.event);
  } catch (err) {
    console.log(err.response);
    if (!err.response) {
      dispatch(setError(err.message));
    }
    return Promise.reject(err);
  }
};

export const updateEvent = () => async () => {

}

export const fetchEvent = (suffix) => async (dispatch) => {
  try {
    const getEventRes = await axios.get(`event/${suffix}`);
    if (!getEventRes.data.ok) throw Error("getEvent Res Error");
    dispatch(setStatus("launcher"));
    dispatch(setEvent(getEventRes.data.data.event));
    dispatch(setEventState(getEventState(getEventRes.data.data.event)))

    return Promise.resolve(true)
  } catch (err) {
    console.log(err.message);
    return Promise.reject(err)
  }
};
