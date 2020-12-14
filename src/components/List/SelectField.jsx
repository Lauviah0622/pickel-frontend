import React from "react";
import styled from "styled-components";

import MuiTextField from "@material-ui/core/TextField";
import MuiMenuItem from "@material-ui/core/MenuItem";

const TextField = styled(MuiTextField)`
  &.MuiTextField-root {
    width: 18ch;
  }
  .MuiSelect-select {
    padding-left: 12px;
  }
`;

const MenuItem = styled(MuiMenuItem)`
    
`;

/**
 * @typedef options [{value: any, label: string}]
 */

/**
 * 
 * @param {options} options 
 * @param {*} unitTag 
 * @param {*} value 
 * @param {*} handleChange 
 */
export default function SelectField({options, value, handleChange}) {
  return (
    <>
      <TextField select value={value} onChange={handleChange}>
        {options && options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
