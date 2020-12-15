import React from "react";
import styled from "styled-components";
import "date-fns";
import ListItem from "../../../../components/List/ListItem.jsx";
import DateTimePicker from "../../../../components/List/DateTimePicker.jsx";


const ItemText = styled.p`
    margin: 3px 0;
    margin-top: 8px;
    font-size: 0.8rem;
`;


export default function PickTimeFilter() {
  return (
    <ListItem text="時間範圍">
      <DateTimePicker/>
      <ItemText>至</ItemText>
      <DateTimePicker/>
    </ListItem>
  );
}
