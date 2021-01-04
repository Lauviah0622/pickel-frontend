import React from "react";
import styled from 'styled-components';

import ListItem from "../../../layout/Sidebar/PanelItem.jsx";
import SelectField from "../../../layout/Sidebar/SelectField.jsx";
import ListCheckbox from "../../../layout/Sidebar/Checkbox.jsx";

const alldayOptions = Array(7)
  .fill(0)
  .map((_, i) => ({ label: `${i + 1}天`, value: i + 1 }));

const partOptions = (() => {
  const arr = [];
  let counter = 1;
  while (counter / 4 < 24) {
    const hour = counter / 4;
    let label = "";
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

const FixedContent = styled.div`
  padding: 6px 24px 6px 6px;
  /* border-bottom: 1px solid black; */
`;


const fixedDuration = (eventDuration, eventType) => {
  let str = '';
  if (eventType === 'part') {
    const durationMin = eventDuration * 15;
    const  m = durationMin % 60;
    const h = (durationMin - m) / 60;
    str = `${h} 小時 ${m} 分鐘`
  }
  if (eventType === 'allday') {
    str = `${eventDuration} 天`
  }
  
  return (<ListItem  text="活動時長">
    <FixedContent>
      {str}
    </FixedContent>
  </ListItem>)
}

export default function EventDuration({
  eventType,
  eventDuration,
  setEventType,
  setEventDuration,
}) {
  const eventDurationEditable = typeof setEventDuration === "function";
  const eventTypeEditable = typeof setEventType === "function";

  if (!eventDurationEditable && !eventTypeEditable) {
    return fixedDuration(eventDuration, eventType)
  }
  if (eventTypeEditable && !eventDurationEditable) {
    throw Error("cannot only change event type");
  }


  const handleDurationChange = eventDurationEditable
    ? (e) => {
        setEventDuration(e.target.value);
      }
    : null;

  const handleTypeChange = eventTypeEditable
    ? (e) => {
        setEventType(e.target.checked ? "allday" : "part");
        setEventDuration(1);
      }
    : null;


  return (
    <ListItem text="活動時長">
      <div>
        <SelectField
          options={eventType === "allday" ? alldayOptions : partOptions}
          value={eventDuration}
          onChange={handleDurationChange}
        />
        {eventTypeEditable && (
          <ListCheckbox
            label="全天活動"
            checked={eventType === "allday"}
            onChange={handleTypeChange}
          />
        )}
      </div>
    </ListItem>
  );
}
