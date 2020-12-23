import React from "react";


import ListItem from "../../../../components/List/ListItem.jsx";
import SelectField from "../../../../components/List/SelectField.jsx";
import ListCheckbox from "../../../../components/List/ListCheckbox.jsx";
import useEventStateProps from '../../../../hooks/useEventStateProps';

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

export default function EventDuration() {
  const [eventDurationState, setEventDurationState] = useEventStateProps('duration')
  const [eventTypeState, setEventTypeState] = useEventStateProps('eventType')

  const handleDurationChange = (e) => {
    setEventDurationState(e.target.value)
  }
  const handleTypeChange = (e) => {
    setEventTypeState(e.target.checked ? "allday" : "part")
    setEventDurationState(1)
  }

  return (
    <ListItem text="活動時長">
      <div>
        <SelectField
          options={eventTypeState === 'allday' ? alldayOptions : partOptions}
          value={eventDurationState}
          onChange={handleDurationChange}
        />
        <ListCheckbox
          label="全天活動"
          checked={eventTypeState === 'allday'}
          onChange={handleTypeChange}
        />
      </div>
      <div></div>
    </ListItem>
  );
}
