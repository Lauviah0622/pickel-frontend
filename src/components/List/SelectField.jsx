import React from "react";
import styled from "styled-components";

import MuiSelect from '@material-ui/core/Select';
import MuiMenuItem from "@material-ui/core/MenuItem";


const Select = styled(MuiSelect)`
  &.MuiInput-root {
    margin-right: 7px;
  }
  .MuiSelect-select {
    width: 18ch;
    padding-left: 6px;
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
export default function SelectField({options, ...selectProps}) {
  return (
    <>
      <Select {...selectProps}>
        {options && options.map((option, i) => (
          <MenuItem key={i} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
