import React from "react";
import styled from "styled-components";

import MuiInput from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import EditIcon from "@material-ui/icons/Edit";
import InputAdornment from "@material-ui/core/InputAdornment";

import ListItem from "../../../layout/Sidebar/PanelItem.jsx";

const EventNameInput = styled(MuiInput)`
  .MuiInput-input {
    font-size: 2em;
    font-weight: 700;
    cursor: unset;
  }
  
`;

const EndAdornment = (
  <InputAdornment position="end">
    <EditIcon />
  </InputAdornment>
);

/**
 * if no  setEventName, not for editable
 */
export default function EventName({ eventName, setEventName }) {
  const editable = typeof setEventName === 'function';
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };



  return (
    <ListItem text="活動名稱">
      <EventNameInput
        error={eventName.length === 0}
        value={eventName}
        fullWidth
        onChange={editable && handleEventNameChange}
        endAdornment={editable && EndAdornment}
        disableUnderline={!editable}
        spellCheck="false"
      />
      <FormHelperText error>
        {eventName.length === 0 && "活動名稱不得為空"}
      </FormHelperText>
    </ListItem>
  );
}
