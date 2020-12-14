import React from "react";
import styled from "styled-components";

import MuiInput from "@material-ui/core/Input";
import ListItem from '../../../../components/List/ListItem.jsx';



const EventNameInput = styled(MuiInput)`
.MuiInput-input {
  font-size: 2em;
  font-weight: 700;
}
`;

export default function EventSetting({value}) {
  return (
    <ListItem text="投票設定">
      <EventNameInput
        value={value}
        fullWidth
        disableUnderline
      ></EventNameInput>
    </ListItem>
  );
}
