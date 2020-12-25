import React from "react";

import PanelItem from '../../../../layout/Sidebar/PanelItem.jsx';
import ListCheckbox from "../../../../layout/Sidebar/Checkbox.jsx";


export default function EventSetting() {
  return (
    <PanelItem text="投票設定">
         <ListCheckbox
          label="匿名投票"
          checked={true}
          onChange={() => {}}
          name="checkedA"
        />
    </PanelItem>
  );
}
