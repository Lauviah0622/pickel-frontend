import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { getHalfHourStart } from "../../../utils";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const defaultValue = {
  name: "",
  launcher: "",
  description: "",
  duration: 1,
  eventType: "part",
  pickStart: getHalfHourStart(Date()),
  pickEnd: getHalfHourStart(Date()),
  ranges: [],
};

const eventSlice = createSlice({
  name: "eventState",
  initialState: {
    ...defaultValue,
  },
  reducers: {
    setEventData(state, { payload }) {
      Object.entries(payload).forEach(([key, prop]) => {
        // eslint-disable-next-line
        state[key] = prop;
      });
    },
    addRange(state, { payload }) {
      state.ranges.push(payload);
    },
  },
});

export default eventSlice.reducer;
export const { setEventData, addRange } = eventSlice.actions;

export const setUnsaveEventData = (event) => async (dispatch) => {
  dispatch(setEventData(event));
};

export const addNoRepeatRange = (newRange) => async (dispatch, getState) => {
  const { eventState } = getState();
  const isRepeat = eventState.ranges.map((range) => {
    const startIsValid = dayjs(newRange.start).isSameOrAfter(range.end);
    const endIsValid = dayjs(newRange.end).isSameOrBefore(range.start);
    return startIsValid || endIsValid;
  });
  if (isRepeat.includes(false)) return Promise.reject(Error("repeat range"));
  dispatch(addRange(newRange));
  return Promise.resolve(true);
};
