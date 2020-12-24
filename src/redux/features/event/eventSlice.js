/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import initialEventState from "./initialEventState";

import { checkIsRangeValid } from "../../../utils";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const eventSlice = createSlice({
  name: "eventState",
  initialState: {
    event: { ...initialEventState },
    isRangesAllValid: true,
  },
  reducers: {
    setEventData({ event }, { payload: [prop, value] }) {
      event[prop] = value;
    },
    setEvent(state, {payload}) {
      state.event = payload
    },
    addRange({ event }, { payload }) {
      event.ranges.push(payload);
    },
    deleteRangeByIndex({ event }, { payload }) {
      event.ranges.splice(payload, 1);
    },
    setRangesValidation(state, { payload }) {
      state.isRangesAllValid = payload;
    },
  },
});

export default eventSlice.reducer;
export const {
  setEventData,
  setEvent,
  addRange,
  deleteRangeByIndex,
  setValidation,
  setRangesValidation,
} = eventSlice.actions;

export const setEventProps = (payload) => (dispatch, getState) => {
  Object.entries(payload).forEach(([prop, value]) => {
    if (value instanceof Date) {
      value = dayjs(value).toISOString();
    }
    if (["duration", "eventType", "pickEnd"].includes(prop)) {
      const updatedEvent = { ...getState().eventState.event };
      updatedEvent[prop] = value;
      const updatedRangeCheck = updatedEvent.ranges.map((range) => {
        return checkIsRangeValid(
          range,
          updatedEvent.eventType,
          updatedEvent.duration,
          updatedEvent.pickEnd,
          null,
          true
        );
      });
      dispatch(setRangesValidation(!updatedRangeCheck.includes(false)));
    }
    dispatch(setEventData([prop, value]));
  });
};

export const setUnsaveEventData = (event) => async (dispatch) => {
  dispatch(setEventData(event));
};

export const addNoRepeatRange = (newRange) => async (dispatch) => {
  const serializeNewRange = {
    start: dayjs(newRange.start).toISOString(),
    end: dayjs(newRange.end).toISOString(),
  };
  dispatch(addRange(serializeNewRange));
  
};

export const deleteRange = (rangeIndex) => (dispatch) => {
  dispatch(deleteRangeByIndex(rangeIndex));
};
