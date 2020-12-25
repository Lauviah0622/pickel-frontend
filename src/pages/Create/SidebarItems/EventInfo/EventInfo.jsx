import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

import ListItem from "../../../../layout/Sidebar/PanelItem.jsx";
import useEventStateProps from '../../../../hooks/useEventStateProps';


const ItemContentBlock = styled.div`
  margin-top: 10px;
  + div {
    margin-top: 15px;
  }
`;

const Multiline = styled(TextField)`
  width: 100%;
`;

export default function EventInfo() {

  const [eventLauncherState, setEventLauncherState] = useEventStateProps('launcher')
  const [eventDescriptionState, setEventDescriptionState] = useEventStateProps('description')

  const handleEventLauncherChange = (e) => {
    setEventLauncherState(e.target.value)
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescriptionState(e.target.value)
  };


  return (
    <ListItem text="活動資訊">
      <ItemContentBlock>
        <TextField
          label="活動主辦人"
          variant="outlined"
          size="small"
          value={eventLauncherState}
          onChange={handleEventLauncherChange}
        />
      </ItemContentBlock>
      <FormHelperText error>
        {eventLauncherState.length < 1 && "活動主辦人沒寫呦"}
      </FormHelperText>
      <ItemContentBlock>
        <Multiline
          label="活動附註"
          multiline
          rows={5}
          value={eventDescriptionState}
          size="small"
          variant="outlined"
          onChange={handleEventDescriptionChange}
        />
      </ItemContentBlock>
    </ListItem>
  );
}
