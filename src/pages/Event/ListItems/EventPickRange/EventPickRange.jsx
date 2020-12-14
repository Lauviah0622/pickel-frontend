import React, { useState } from "react";
import styled from "styled-components";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ListItem from "../../../../components/List/ListItem.jsx";


// MuiTextField-root
// .MuiInputBase-input



const  DatePicker= styled(KeyboardDatePicker)`
    margin-right: 5px;
    .MuiInputBase-input {
        width: 10ch;
    }
    .MuiIconButton-root {
        padding: 9px;
    }
    
`;
const  TimePicker= styled(KeyboardTimePicker)`
    .MuiInputBase-input {
        width: 7.6ch;
    }
    .MuiIconButton-root {
        padding: 9px;
    }
`;

const ItemText = styled.p`
    margin: 3px 0;
    margin-top: 8px;
    font-size: 0.8rem;
`;


export default function EventName() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <ListItem text="活動舉辦區間">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>

        <DatePicker
          id="date-picker-dialog"
          format="M/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <TimePicker
          id="time-picker"
          value={selectedDate}
          onChange={handleDateChange}
          keyboardIcon={<AccessTimeIcon/>}
        />
        </div>
        <ItemText>至</ItemText>
        <div>

        <DatePicker
          id="date-picker-dialog"
          format="M/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <TimePicker
          id="time-picker"
          value={selectedDate}
          onChange={handleDateChange}
          keyboardIcon={<AccessTimeIcon/>}
        />
        </div>
      </MuiPickersUtilsProvider>
    </ListItem>
  );
}
