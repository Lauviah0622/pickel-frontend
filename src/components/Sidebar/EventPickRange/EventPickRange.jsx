import React from "react";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
} from "@material-ui/pickers";
import dayjs from "dayjs";

import ListItem from "../../../layout/Sidebar/PanelItem.jsx";
import { getFormatedRange } from '../../../utils';

const ItemText = styled.p`
  margin: 3px 0;
  margin-top: 8px;
  font-size: 0.8rem;
`;

const Contianer = styled.div`
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing);

  .range__date {
    flex-grow: 1;
  }

  .datetime__container {
    display: flex;
    justify-content: space-between;
    width: inherit;


    & + .datetime__container {
      margin-top: 4px;
    }
  }
  .datetime__time {
    width: 10ch;
  }
`;

const UneditableContent = (eventPickStart, eventPickEnd) => {
  const formatedRange = getFormatedRange(eventPickStart, eventPickEnd);
  let range;
  if (!formatedRange.length) {
    range = (
      <div>
        <div className="datetime__container">
          <div>{formatedRange.date}</div>
          <div className="datetime__time">
            {formatedRange.time[0]}～
            {formatedRange.time[1]}
          </div>
        </div>
      </div>
    );
  } else {
    range = (
      <>
        <div className="datetime__container">
          <div>{formatedRange[0].date}</div>
          <div className="datetime__time">{formatedRange[0].time}～</div>
        </div>
        <div className="datetime__container">
          <div>{formatedRange[1].date}</div>
          <div className="datetime__time">{formatedRange[1].time}</div>
        </div>
      </>
    );
  }

  return (
    <ListItem text="活動投票時間">
      <Contianer>{range}</Contianer>
    </ListItem>
  );
};

export default function EventpickRange({
  eventType,
  eventDuration,
  eventPickStart,
  eventPickEnd,
  setEventPickStart,
  setEventPickEnd,
}) {
  if (
    typeof setEventPickStart !== "function" ||
    typeof setEventPickEnd !== "function"
  ) {
    return UneditableContent(eventPickStart, eventPickEnd);
  }
  const handleEventPickStartChange = (dateTime) => {
    const unit = eventType === "part" ? "minute" : "day";
    const addValue = eventType === "part" ? 15 : 1;
    setEventPickStart(dateTime);
    if (dayjs(dateTime).isAfter(dayjs(eventPickEnd))) {
      setEventPickEnd(
        dayjs(dateTime)
          .add(addValue * eventDuration, unit)
          .toISOString()
      );
    }
  };

  const handleEventPickEndChange = (dateTime) => {
    setEventPickEnd(dateTime);
  };

  return (
    <ListItem text="活動投票時間">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiKeyboardDateTimePicker
          ampm={false}
          minutesStep={15}
          value={eventPickStart}
          onChange={handleEventPickStartChange}
          disablePast
          // FIXME:呈現時間可以，如果要更改就不行？這裡要想一下業務邏輯尚要怎麼處理
          format="yyyy/MM/dd HH:mm"
        />
        <ItemText>至12312312</ItemText>
        <MuiKeyboardDateTimePicker
          minDate={eventPickStart}
          ampm={false}
          minutesStep={15}
          value={eventPickEnd}
          onChange={handleEventPickEndChange}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
      </MuiPickersUtilsProvider>
      <FormHelperText error>
        {eventPickStart > eventPickEnd && "投票結束時間需要晚於投票開始時間"}
      </FormHelperText>
    </ListItem>
  );
}
