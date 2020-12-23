import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import MuiIconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import FormHelperText from "@material-ui/core/FormHelperText";

import { getHalfHourStart } from "../../../../utils";
import { addNoRepeatRange } from "../../../../redux/features/event/eventSlice";

const IconButton = styled(MuiIconButton)`
  position: relative;
  /* top: -2px;*/
  left: -1px;
`;

const ItemText = styled.p`
  margin: 3px 0;
  margin-top: 8px;
  font-size: 0.8rem;
`;

const AddPeriodContainer = styled.div`
  display: flex;
`;

const createDefaultRange = (eventType, duration, defaultRangeStart) => {
  return eventType === "part"
    ? [
        getHalfHourStart(dayjs(defaultRangeStart)),
        dayjs(getHalfHourStart(dayjs(defaultRangeStart)))
          .add(duration * 15, "m")
          .toDate(),
      ]
    : [
        getHalfHourStart(dayjs(defaultRangeStart)),
        dayjs(getHalfHourStart(dayjs(defaultRangeStart)))
          .add(duration, "d")
          .toDate(),
      ];
};

export default function AddRange() {
  const dispatch = useDispatch();
  const { event } = useSelector((store) => store.eventState);
  const [addRangeError, setAddRangeError] = useState(false);

  const defaultRange = createDefaultRange(
    event.eventType,
    event.duration,
    dayjs(event.pickEnd).add(1, "d")
  );

  const [start, setStart] = useState(defaultRange[0]);
  const [end, setEnd] = useState(defaultRange[1]);

  const handleAddClick = () => {
    if (start >= end) return;
    dispatch(addNoRepeatRange({ start, end }))
      .then(() => setAddRangeError(''))
      .catch((err) => setAddRangeError(err.message));
  };

  const resetAddRangeError = () => {
    setAddRangeError('')
  }

  useEffect(() => {
    setStart(defaultRange[0]);
    setEnd(defaultRange[1]);
  }, [event]);

  const handleStartOnchange = (dateTimeValue) => {
    const unit = event.eventType === "part" ? "minute" : "day";
    const addValue = event.eventType === "part" ? 15 : 1;
    setStart(dateTimeValue);
    setEnd(dayjs(dateTimeValue).add(addValue * event.duration, unit));
  };

  return (
    <AddPeriodContainer>
      <div className="range__adorment">
        <IconButton size="small" onClick={handleAddClick}>
          <AddRoundedIcon />
        </IconButton>
      </div>
      <div className="range__date">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiKeyboardDateTimePicker
            ampm={false}
            minutesStep={15}
            value={start}
            onChange={handleStartOnchange}
            onClick={resetAddRangeError}
            disablePast
            format="yyyy/MM/dd HH:mm"
          />
          <ItemText>至</ItemText>
          <MuiKeyboardDateTimePicker
            error={start >= end || addRangeError.length > 0}
            minDate={start}
            ampm={false}
            minutesStep={15}
            value={end}
            onChange={setEnd}
            onClick={resetAddRangeError}
            disablePast
            helperText={false}
            format="yyyy/MM/dd HH:mm"
          />
        </MuiPickersUtilsProvider>
        <FormHelperText error>
          {start >= end ? "時段結束需要晚於時段開始" : ""}
          {addRangeError}
        </FormHelperText>
      </div>
    </AddPeriodContainer>
  );
}
