import React from "react";
import styled from "styled-components";

import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ListItem from "../../../../components/List/ListItem.jsx";
import SelectField from "./SelectField.jsx";

const alldayOptions = Array(7)
  .fill(0)
  .map((_, i) => ({ label: `${i + 1}天`, value: i + 1 }));

const partOptions = (() => {
  const arr = [];
  let counter = 1;
  while (counter / 4 < 24) {
    const hour = counter / 4;
    let label = "";
    // counter / 4 <= 1 ? `${counter % 4} 分鐘` : `${counter / 4} 小時 ${counter % 4} 分鐘 `;
    if (hour < 1) {
      label = `${(counter % 4) * 15} 分鐘`;
    } else if (hour === 1) {
      label = `1 小時`;
    } else {
      label = `${Math.floor(counter / 4)} 小時 ${(counter % 4) * 15} 分鐘 `;
    }
    if (hour <= 1 || counter % 2 === 0) {
      arr.push({
        label,
        value: counter,
      });
    }
    counter += 1;
  }
  return arr;
})();

const FormControlLabel = styled(MuiFormControlLabel)`
  &.MuiFormControlLabel-root {
    align-items: flex-start;
    margin-right: 0;
    margin-top: 7px;
  }
  .MuiFormControlLabel-label {
    display: inline-block;
    margin-top: 7px;
    margin-left: 5px;
    align-items: flex-start;
  }
  .PrivateSwitchBase-root-2 {
    padding-top: 6px;
    padding-right: 0px;
  }
`;

export default function EventDuration({ duration, isAllday, toggleIsAllday, setDuration }) {

  const selectOnchange = (e) => {
    setDuration(e.target.value)
  }

  return (
    <ListItem text="活動時長">
      <div>
        <SelectField
          options={isAllday ? alldayOptions : partOptions}
          value={duration}
          handleChange={selectOnchange}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllday}
              onChange={toggleIsAllday}
              name="checkedA"
            />
          }
          label="全天活動"
        />
      </div>
    </ListItem>
  );
}
