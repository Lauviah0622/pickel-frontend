import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import dayjs from "dayjs";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import MuiIconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import FormHelperText from "@material-ui/core/FormHelperText";

import { getHalfHourStart } from "../../../../utils";

const IconButton = styled(MuiIconButton)`
  position: relative;
  /* top: -2px;*/
  left: -1px;
`;

const ItemText = styled.p`
  margin: 3px 0;
  margin-top: 8px;
  font-size: 0.8rem;
`;

const AddPeriodContainer = styled.div`
  display: flex;
`;

export default function AddRange({
  addRange,
  addRangeError,
  resetAddRangeError,
  type,
}) {
  const defaultRange =
    type === "part"
      ? [
          getHalfHourStart(Date()),
          dayjs(getHalfHourStart(Date())).add(15, "m").toDate(),
        ]
      : [
          getHalfHourStart(Date()),
          dayjs(getHalfHourStart(Date())).add(1, "d").toDate(),
        ];

  const [start, setStart] = useState(defaultRange[0]);
  const [end, setEnd] = useState(defaultRange[1]);
  const handleAddClick = () => {
    if (start >= end) return;
    addRange({ start, end });
  };

  useEffect(() => {
    setStart(defaultRange[0]);
    setEnd(defaultRange[1])
  }, [type])

  return (
    <AddPeriodContainer>
      <div className="range__adorment">
        <IconButton size="small" onClick={handleAddClick}>
          <AddRoundedIcon />
        </IconButton>
      </div>
      <div className="range__date">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiKeyboardDateTimePicker
            ampm={false}
            minutesStep={15}
            value={start}
            onChange={setStart}
            onClick={resetAddRangeError}
            disablePast
            format="yyyy/MM/dd HH:mm"
          />
          <ItemText>至</ItemText>
          <MuiKeyboardDateTimePicker
            error={start >= end || addRangeError}
            minDate={start}
            ampm={false}
            minutesStep={15}
            value={end}
            onChange={setEnd}
            onClick={resetAddRangeError}
            disablePast
            helperText={false}
            format="yyyy/MM/dd HH:mm"
          />
        </MuiPickersUtilsProvider>
        <FormHelperText error>
          {start >= end ? "時段結束需要晚於時段開始" : ""}
          {addRangeError && "已有重複的時段"}
        </FormHelperText>
      </div>
    </AddPeriodContainer>
  );
}
