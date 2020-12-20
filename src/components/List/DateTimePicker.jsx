import React from "react";
import styled from "styled-components";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MuiSelect from "@material-ui/core/Select";
import MuiMenuItem from "@material-ui/core/MenuItem";
import dayjs from "dayjs";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import { getHalfHourStart } from "../../utils";

const DatePicker = styled(KeyboardDatePicker)`
  &.MuiFormControl-root {
    margin-right: 5px;
  }
  .MuiInputBase-input {
    width: 10ch;
  }
  .MuiIconButton-root {
    padding: 9px;
  }
`;
const TimePicker = styled(MuiSelect)`
  .MuiSelect-root {
    width: 9.6ch;
    margin-right: 7px;
  }
  .MuiSvgIcon-root {
    margin-left: 8px;
    padding-right: 9px;
  }
  .MuiSelect-iconOpen {
    transform: none;
  }
  &.MuiInput-underline::after {
    border-bottom: 2px solid ${(props) => props.theme.palette.primary.main};
  }
`;

// 時間這部分應該不會做在這邊，反正先做起來之後再重構
/**
 * create Time options, 間隔 15 分鐘
 * @param {Date} timeStart
 * @return {Array} [{label: string, value: Date}]
 */
const crateTimeOptions = (timeStart) => {
  const options = [];
  for (let hr = 0; hr < 24; hr += 1) {
    for (let min = 15; min <= 60; min += 15) {
      const daytime = dayjs(timeStart).add(hr, "hour").add(min, "minute");
      options.push({
        label: daytime.format("hh:mm a"),
        value: daytime.toDate(),
      });
    }
  }
  return options;
};

/**
 * example: 14:40 => 14:30, 13:20 => 13:00
 *
 * @param {Date} time
 * @return {Date}
 */

export default function DateTimePicker({
  onDateTimeChange,
  value,
  minDateTime,
  invalid,
}) {
  const defaultValue = minDateTime || getHalfHourStart(new Date());
  const handleDateChange = (date) => {
    onDateTimeChange(date);
  };
  const handleTimeChage = (_, child) => {
    onDateTimeChange(child.props.value);
  };

  const timeOptions = crateTimeOptions(defaultValue);
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl>
          <DatePicker
            id="date-picker-dialog"
            format="yyyy/M/dd"
            value={value}
            onChange={handleDateChange}
            showTodayButton
            minDate={defaultValue}
            disablePast
          />
          <TimePicker
            error={invalid}
            value={String(value)}
            renderValue={() => dayjs(value).format("hh:mm a")}
            onChange={handleTimeChage}
            IconComponent={AccessTimeIcon}
          >
            {timeOptions.map((option, i) => (
              <MuiMenuItem key={i} value={option.value}>
                {option.label}
              </MuiMenuItem>
            ))}
          </TimePicker>
          <FormHelperText>
            Time should not be ealry than start time
          </FormHelperText>
        </FormControl>
      </MuiPickersUtilsProvider>
    </div>
  );
}
