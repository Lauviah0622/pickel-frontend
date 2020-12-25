import React from "react";
import styled from "styled-components";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import ListItem from "../../../../layout/Sidebar/PanelItem.jsx";
import useEventStateProps from "../../../../hooks/useEventStateProps";

const ItemText = styled.p`
  margin: 3px 0;
  margin-top: 8px;
  font-size: 0.8rem;
`;

export default function EventpickRange() {
  const [eventPickStartState, setEventPickStartState] = useEventStateProps(
    "pickStart"
  );
  const [eventPickEndState, setEventPickEndState] = useEventStateProps(
    "pickEnd"
  );

  const {
    duration: eventDurationState,
    eventType: eventTypeState,
  } = useSelector((store) => store.eventState.event);

  const handleEventPickStartChange = (dateTime) => {
    const unit = eventTypeState === "part" ? "minute" : "day";
    const addValue = eventTypeState === "part" ? 15 : 1;
    setEventPickStartState(dateTime);
    setEventPickEndState(
      dayjs(dateTime)
        .add(addValue * eventDurationState, unit)
        .toISOString()
    );
  };

  const handleEventPickEndChange = (dateTime) => {
    setEventPickEndState(dateTime);
  };

  return (
    <ListItem text="活動投票時間">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiKeyboardDateTimePicker
          ampm={false}
          minutesStep={15}
          value={eventPickStartState}
          onChange={handleEventPickStartChange}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
        <ItemText>至</ItemText>
        <MuiKeyboardDateTimePicker
          minDate={eventPickStartState}
          ampm={false}
          minutesStep={15}
          value={eventPickEndState}
          onChange={handleEventPickEndChange}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
      </MuiPickersUtilsProvider>
      <FormHelperText error>
        {eventPickStartState > eventPickEndState && "投票結束時間需要晚於投票開始時間"}
      </FormHelperText>
    </ListItem>
  );
}
