import React from "react";

import ListItem from "../../../../components/List/ListItem.jsx";
// import SelectField from "./SelectField.jsx";
import SelectField from "../../../../components/List/SelectField.jsx";
import ListCheckbox from "../../../../components/List/ListCheckbox.jsx";

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

export default function EventDuration({
  duration,
  isAllday,
  toggleIsAllday,
  setDuration,
}) {
  const selectOnchange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <ListItem text="活動時長">
      <div>
        <SelectField
          options={isAllday ? alldayOptions : partOptions}
          value={duration}
          handleChange={selectOnchange}
        />
        <ListCheckbox
          label="全天活動"
          checked={isAllday}
          onChange={toggleIsAllday}
          name="checkedA"
        />
      </div>
      <div></div>
    </ListItem>
  );
}
