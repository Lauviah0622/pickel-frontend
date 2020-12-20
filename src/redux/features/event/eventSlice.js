import { createSlice } from "@reduxjs/toolkit";
import { getHalfHourStart } from "../../../utils";

const defaultValue = {
  name: "",
      launcher: "",
      description: "",
      duration: 1,
      type: "part",
      pickStart: getHalfHourStart(Date().now),
      pickEnd: getHalfHourStart(Date().now),
}

const eventSlice = createSlice({
  name: "eventState",
  initialState: {
     ...defaultValue
  },
  reducers: {
    setEventData(state, { payload }) {
      console.log('set event: prevState', state)
      Object.entries(payload).forEach(([key, prop]) => {
        // eslint-disable-next-line
        state[key] = prop;
      })
    },
  },
});

export default eventSlice.reducer;
export const { setEventData } = eventSlice.actions;

export const setUnsaveEventData = (event) => async (dispatch) => {
  dispatch(setEventData(event));
};
