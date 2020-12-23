import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useSelector, useDispatch } from "react-redux";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import MuiIconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import FormHelperText from "@material-ui/core/FormHelperText";

import { getHalfHourStart, isValidDuration } from "../../../../utils";
import { addNoRepeatRange } from "../../../../redux/features/event/eventSlice";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const IconButton = styled(MuiIconButton)`
  position: relative;
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

const DateTimePicker = (props) => (
  <MuiKeyboardDateTimePicker
    ampm={false}
    minutesStep={15}
    disablePast
    format="yyyy/MM/dd HH:mm"
    {...props}
  />
);

const checkIsRangeRepeat = (ranges, addRangeStart, addRangeEnd) => {
  if (ranges.length < 1) return false;

  return ranges
    .map((range) => {
      const startIsValid = dayjs(addRangeStart).isSameOrAfter(range.end);
      const endIsValid = dayjs(addRangeEnd).isSameOrBefore(range.start);
      return startIsValid || endIsValid;
    })
    .includes(false);
};

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
  const { eventType, duration, pickEnd, ranges } = useSelector(
    (store) => store.eventState.event
  );

  const defaultRange = createDefaultRange(
    eventType,
    duration,
    dayjs(pickEnd).add(1, "d")
  );

  const [start, setStart] = useState(defaultRange[0]);
  const [end, setEnd] = useState(defaultRange[1]);

  const isRangeLongerThenDuration = isValidDuration(
    start,
    end,
    eventType,
    duration
  );
  const isRangeLaterThanPickEnd = dayjs(start).isAfter(dayjs(pickEnd));
  const isRangeRepeat = checkIsRangeRepeat(ranges, start, end);

  const handleAddClick = () => {
    if (
      start >= end ||
      !isRangeLaterThanPickEnd ||
      !isRangeLongerThenDuration ||
      isRangeRepeat
    )
      return;
    dispatch(addNoRepeatRange({ start, end }))
  };

  useEffect(() => {
    setStart(defaultRange[0]);
    setEnd(defaultRange[1]);
  }, [eventType, duration, pickEnd]);

  const handleStartOnchange = (dateTimeValue) => {
    const unit = eventType === "part" ? "minute" : "day";
    const addValue = eventType === "part" ? 15 : 1;
    setStart(dayjs(dateTimeValue).toISOString());
    setEnd(
      dayjs(dateTimeValue)
        .add(addValue * duration, unit)
        .toISOString()
    );
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
          <DateTimePicker
            onChange={handleStartOnchange}
            value={start}
          />
          <ItemText>至</ItemText>
          <DateTimePicker
            value={end}
            onChange={setEnd}
            minDate={start}
          />
        </MuiPickersUtilsProvider>
        <FormHelperText error>
          {start >= end && "時段結束需要晚於時段開始"}
          {!isRangeLongerThenDuration && "至少要大於預計活動時長喔"}
          {!isRangeLaterThanPickEnd && "必須晚於投票時間"}
          {isRangeRepeat && "時段重複囉"}
        </FormHelperText>
      </div>
    </AddPeriodContainer>
  );
}
