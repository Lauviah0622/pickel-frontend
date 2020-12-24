import React from "react";
import styled from "styled-components";

import MuiInput from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import EditIcon from "@material-ui/icons/Edit";
import InputAdornment from "@material-ui/core/InputAdornment";

import ListItem from "../../../../components/List/ListItem.jsx";
import useEventStateProps from '../../../../hooks/useEventStateProps';

const EventNameInput = styled(MuiInput)`
  .MuiInput-input {
    font-size: 2em;
    font-weight: 700;
  }
`;

export default function EventName() {
  const [eventNameState, setEventNameState] = useEventStateProps('name')
  
  const handleEventNameChange = (e) => {
    setEventNameState(e.target.value)
  };

  return (
    <ListItem text="活動名稱">
      <EventNameInput
        error={eventNameState.length === 0}
        value={eventNameState}
        fullWidth
        onChange={handleEventNameChange}
        endAdornment={
          <InputAdornment position="end">
            <EditIcon />
          </InputAdornment>
        }
      ></EventNameInput>
      <FormHelperText error>
        {eventNameState.length === 0 && "活動名稱不得為空"}
      </FormHelperText>
    </ListItem>
  );
}
