import React from "react";
import styled from "styled-components";
import "date-fns";
import ListItem from "../../../../components/List/ListItem.jsx";
import DateTimePicker from "../../../../components/List/DateTimePicker.jsx";



// MuiTextField-root
// .MuiInputBase-input



const ItemText = styled.p`
    margin: 3px 0;
    margin-top: 8px;
    font-size: 0.8rem;
`;


export default function EventName() {
  return (
    <ListItem text="活動舉辦區間">
    <DateTimePicker/>
      <ItemText>至</ItemText>
      <DateTimePicker/>
    </ListItem>
  );
}
