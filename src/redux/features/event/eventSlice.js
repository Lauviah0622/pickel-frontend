/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import { initialEventState, initialPropsValidationState } from "./initialState";

import propValidations from './propValidations';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * validation => true 表示正確
 *
 * TODO: 有機會再補完 validation，還需要弄一個個別的根 全部的 validation
 * TODO: 有沒有辦法每次更新完 redux 的 state 就自己檢查？
 */

const eventSlice = createSlice({
  name: "eventState",
  initialState: {
    event: { ...initialEventState },
    propsValidation: { ...initialPropsValidationState },
  },
  reducers: {
    setEventData({ event }, { payload: [prop, value] }) {
      event[prop] = value;
    },
    setValidation({ propsValidation }, { payload: [prop, isValid] }) {
      propsValidation[prop] = isValid;
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
    const isValid = propValidations[prop]
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

  const serializeNewRange = {
    start: dayjs(newRange.start).toISOString(),
    end: dayjs(newRange.end).toISOString(),
  };
  dispatch(addRange(serializeNewRange));

  const newRangeClone = [...eventState.event.ranges].push(serializeNewRange);

  const isValid = propValidations.ranges
    .map(({ validation, message }) => {
      return validation(newRangeClone) ? null : message;
    })
    .filter((err) => err);
  dispatch(setValidation(["ranges", isValid]));

  return Promise.resolve(true);
};

export const deleteRange = (rangeIndex) => (dispatch, getState) => {
  const { eventState } = getState();
  const newRangeClone = [...eventState.event.ranges].splice(rangeIndex, 1);
  const valudations = propValidations.ranges;

  // TODO: 這個根上面的 props 的設定一起抽出來

  const isValid = valudations
    .map(({ validation, message }) => {
      return validation(newRangeClone) ? null : message;
    })
    .filter((err) => err);
  dispatch(setValidation(["ranges", isValid]));
  dispatch(deleteRangeByIndex(rangeIndex));
};
