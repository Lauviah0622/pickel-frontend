import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import MuiIconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import FormHelperText from "@material-ui/core/FormHelperText";

import {
  getHalfHourStart,
  checkIsRangeValid,
} from "../../../utils";

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

export default function AddRange({
  eventType,
  duration,
  pickEnd,
  ranges,
  handleAddRange
}) {

  const defaultRange = createDefaultRange(
    eventType,
    duration,
    dayjs(pickEnd).add(1, "d")
  );

  const [start, setStart] = useState(defaultRange[0]);
  const [end, setEnd] = useState(defaultRange[1]);

  const isRangeValid = checkIsRangeValid({ start, end }, eventType, duration, pickEnd, ranges);

  const handleAddClick = () => {
    if (Object.values(isRangeValid).includes(false))
      return;
    handleAddRange(start, end)
  };

  // defualtRange 只是運算出來的結果，所以這裡 dependency 不加 defualtRange，不知道對不對？
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
          <DateTimePicker onChange={handleStartOnchange} value={start} />
          <ItemText>至</ItemText>
          <DateTimePicker value={end} onChange={setEnd} minDate={start} />
        </MuiPickersUtilsProvider>
        <FormHelperText error>
          {!isRangeValid.isEndLateThenStart && "時段結束需要晚於時段開始"}
          {!isRangeValid.isLongerThenDuration && "至少要大於預計活動時長喔"}
          {!isRangeValid.isLaterThanPickEnd && "必須晚於投票時間"}
          {!isRangeValid.isNoRepeat && "時段重複囉"}
        </FormHelperText>
      </div>
    </AddPeriodContainer>
  );
}
