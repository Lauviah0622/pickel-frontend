import React from "react";
import styled from "styled-components";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import ListItem from "../../../../components/List/ListItem.jsx";
import useEventStateProps from '../../../../hooks/useEventStateProps';

const ItemText = styled.p`
  margin: 3px 0;
  margin-top: 8px;
  font-size: 0.8rem;
`;

export default function EventpickRange() {
  const [eventPickStartState, setEventPickStartState] = useEventStateProps('pickStart')
  const handleEventPickStartChange = (dateTime) => {
    setEventPickStartState(dateTime)
  };

  const [eventPickEndState, setEventPickEndState] = useEventStateProps('pickEnd')
  const handleEventPickEndChange = (dateTime) => {
    setEventPickEndState(dateTime)
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
    </ListItem>
  );
}
