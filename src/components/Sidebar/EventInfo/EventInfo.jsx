import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import PanelItem from "../../../layout/Sidebar/PanelItem.jsx";

const ItemContentBlock = styled.div`
  margin-top: 10px;
  + div {
    margin-top: 15px;
  }
`;

const Multiline = styled(TextField)`
  width: 100%;
`;

export default function EventInfo({
  eventLauncher,
  eventDescription,
  setEventLauncher,
  setEventDescription,
}) {
  const eventLauncherEditable = typeof setEventLauncher === "function";
  const eventDescriptinoEditable = typeof setEventDescription === "function";

  const handleEventLauncherChange = eventLauncherEditable ? (e) => {
    setEventLauncher(e.target.value);
  } : null;

  const handleEventDescriptionChange = eventDescriptinoEditable
    ? (e) => {
        setEventDescription(e.target.value);
      }
    : null;

  return (
    <PanelItem text="活動資訊">
      <ItemContentBlock>
        <TextField
          label="活動主辦人"
          variant="outlined"
          size="small"
          value={eventLauncher}
          onChange={handleEventLauncherChange}
        />
      </ItemContentBlock>
      <FormHelperText error>
        {eventLauncher.length < 1 && "活動主辦人沒寫呦"}
      </FormHelperText>
      <ItemContentBlock>
        <Multiline
          label="活動附註"
          multiline
          rows={5}
          value={eventDescription}
          size="small"
          variant="outlined"
          onChange={handleEventDescriptionChange}
        />
      </ItemContentBlock>
    </PanelItem>
  );
}
