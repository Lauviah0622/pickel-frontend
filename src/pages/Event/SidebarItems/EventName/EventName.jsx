import React from "react";
import styled from "styled-components";

import MuiInput from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import EditIcon from "@material-ui/icons/Edit";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItem from "../../../../components/List/ListItem.jsx";

const EventNameInput = styled(MuiInput)`
  .MuiInput-input {
    font-size: 2em;
    font-weight: 700;
  }
`;

export default function EventName({ value, onChange }) {
  return (
    <ListItem text="活動名稱">
      <EventNameInput
        error={value.length === 0}
        value={value}
        fullWidth
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <EditIcon />
          </InputAdornment>
        }
      ></EventNameInput>
      <FormHelperText error>
        {value.length === 0 && "活動名稱不得為空"}
      </FormHelperText>
    </ListItem>
  );
}
