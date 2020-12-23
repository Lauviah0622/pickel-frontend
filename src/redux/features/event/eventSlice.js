/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { getHalfHourStart, isValidDuration } from "../../../utils";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const defaultValue = {
  name: "",
  launcher: "",
  description: "",
  duration: 1,
  eventType: "part",
  pickStart: getHalfHourStart(dayjs()),
  pickEnd: getHalfHourStart(dayjs().add(1, "d")),
  ranges: [],
};

/**
 * validation => true 表示正確
 *
 * TODO: 有機會再補完 validation，還需要弄一個個別的根 全部的 validation
 * TODO: 有沒有辦法每次更新完 redux 的 state 就自己檢查？
 */
const valueValidation = {
  name: [
    {
      validation: (value) => value.length > 0,
      message: "no event name",
    },
  ],
  launcher: [
    { validation: (value) => value.length > 0, message: "no launcher name" },
  ],
  description: [],
  duration: [
    {
      validation: (value) => typeof value === "number" || value > 0,
      message: "invalid duration",
    },
  ],
  eventType: [
    {
      validation: (value) => ["part", "allday"].includes(value),
      message: "invalid eventType value",
    },
  ],
  pickStart: [
    {
      validation: (value) =>
        typeof value === "string" || dayjs(value).isValid(),
      message: "invalid time format",
    },
  ],
  pickEnd: [
    {
      validation: (value) =>
        typeof value === "string" || dayjs(value).isValid(),
      message: "invalid time format",
    },
  ],
  ranges: [
    {
      validation: (value) => {
        console.log('validation', value.length > 0)
        return value.length > 0
      },
      message: "no ranges",
    },
  ],
};

const defaultValidation = Object.keys(defaultValue).reduce((prevObj, key) => {
  const obj = { ...prevObj };
  obj[key] = [];
  return obj;
}, {});

const eventSlice = createSlice({
  name: "eventState",
  initialState: {
    event: {
      ...defaultValue,
    },
    validation: defaultValidation,
  },
  reducers: {
    setEventData({ event }, { payload: [prop, value] }) {
      event[prop] = value;
    },
    setValidation({ validation }, { payload: [prop, isValid] }) {
      validation[prop] = isValid;
    },
    addRange({ event }, { payload }) {
      event.ranges.push(payload);
    },
    deleteRangeByIndex({ event }, { payload }) {
      event.ranges.splice(payload, 1);
    },
    
  },
});

export default eventSlice.reducer;
export const {
  setEventData,
  addRange,
  deleteRangeByIndex,
  setValidation,
} = eventSlice.actions;

export const setEventProps = (payload) => (dispatch) => {
  Object.entries(payload).forEach(([prop, value]) => {
    if (value instanceof Date) {
      value = dayjs(value).toISOString();
    }
    dispatch(setEventData([prop, value]));
    const isValid = valueValidation[prop]
      .map(({ validation, message }) => {
        return validation(value) ? null : message;
      })
      .filter((err) => err);
    dispatch(setValidation([prop, isValid]));
  });
};

export const setUnsaveEventData = (event) => async (dispatch) => {
  dispatch(setEventData(event));
};

export const addNoRepeatRange = (newRange) => async (dispatch, getState) => {
  const { eventState } = getState();

  const isLateThanPickEnd = (() => {
    const { pickEnd } = eventState;
    return dayjs(newRange.start).isAfter(pickEnd);
  })();

  if (!isLateThanPickEnd)
    return Promise.reject(Error("range should late than pickEnd"));

  const isLongerThanDuration = isValidDuration(
    newRange.start,
    newRange.end,
    eventState.event.eventType,
    eventState.event.duration
  );

  if (!isLongerThanDuration)
    return Promise.reject(Error("range should longer than duration"));

  const isRepeat = eventState.event.ranges.map((range) => {
    const startIsValid = dayjs(newRange.start).isSameOrAfter(range.end);
    const endIsValid = dayjs(newRange.end).isSameOrBefore(range.start);
    return startIsValid || endIsValid;
  });

  if (isRepeat.includes(false)) return Promise.reject(Error("repeat range"));

  const serializeNewRange = {
    start: dayjs(newRange.start).toISOString(),
    end: dayjs(newRange.end).toISOString(),
  };
  dispatch(addRange(serializeNewRange));

  const newRangeClone = [...eventState.event.ranges].push(serializeNewRange);

  console.log('eventState.event.ranges clone', [...eventState.event.ranges])
  console.log('newRangeClone', newRangeClone)
  console.log('newRangeClone', serializeNewRange)

  const isValid = valueValidation.ranges
    .map(({ validation, message }) => {
      return validation(newRangeClone) ? null : message;
    })
    .filter((err) => err);
  dispatch(setValidation(['ranges', isValid]));
  console.log('isValid', isValid);
  return Promise.resolve(true);
};

export const deleteRange = (rangeIndex) => (dispatch, getState) => {
  const { eventState } = getState();
  const newRangeClone = [...eventState.event.ranges].splice( rangeIndex , 1 );
  const valudations = valueValidation.ranges;

  // TODO: 這個根上面的 props 的設定一起抽出來
  console.log('newRangeClone', newRangeClone)

  const isValid = valudations
    .map(({ validation, message }) => {
      return validation(newRangeClone) ? null : message;
    })
    .filter((err) => err);

    console.log('isValid', isValid);
  dispatch(setValidation(['ranges', isValid]));
  dispatch(deleteRangeByIndex(rangeIndex));
};



