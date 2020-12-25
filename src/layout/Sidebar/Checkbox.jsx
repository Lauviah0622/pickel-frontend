import React from "react";
import styled from "styled-components";

import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const FormControlLabel = styled(MuiFormControlLabel)`
  &.MuiFormControlLabel-root {
    align-items: flex-start;
    margin-right: 0;
  }
  .MuiFormControlLabel-label {
    display: inline-block;
    margin-top: 7px;
    margin-left: 5px;
    align-items: flex-start;
  }
  .MuiCheckbox-root {
    padding-top: 6px;
    padding-right: 0px;
  }
`;

export default function ListCheckbox({ name, checked, onChange, label }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} name={name} />}
      label={label}
      className="sidebar__checkbox"
    />
  );
}
