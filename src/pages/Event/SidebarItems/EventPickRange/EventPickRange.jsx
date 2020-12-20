import React from "react";
import styled from "styled-components";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import ListItem from "../../../../components/List/ListItem.jsx";

const ItemText = styled.p`
  margin: 3px 0;
  margin-top: 8px;
  font-size: 0.8rem;
`;

export default function EventpickRange({ start, end, onStartChange, onEndChange }) {

  console.log('EventpickRange', start);
  console.log('EventpickRange', end);
  return (
    <ListItem text="活動舉辦區間">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiKeyboardDateTimePicker
          ampm={false}
          minutesStep={15}
          value={start}
          onChange={onStartChange}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
        <ItemText>至</ItemText>
        <MuiKeyboardDateTimePicker
          minDate={start}
          ampm={false}
          minutesStep={15}
          value={end}
          onChange={onEndChange}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
      </MuiPickersUtilsProvider>
    </ListItem>
  );
}
