import React from "react";

import ListItem from '../../../../components/List/ListItem.jsx';
import ListCheckbox from "../../../../components/List/ListCheckbox.jsx";


export default function EventSetting() {
  return (
    <ListItem text="投票設定">
         <ListCheckbox
          label="匿名投票"
          checked={true}
          onChange={() => {}}
          name="checkedA"
        />
    </ListItem>
  );
}
