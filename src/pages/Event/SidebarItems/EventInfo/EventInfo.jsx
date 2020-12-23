import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";

import ListItem from "../../../../components/List/ListItem.jsx";
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
  const handleEventLauncherChange = (e) => {
    setEventLauncherState(e.target.value)
  };

  const [eventDescriptionState, setEventDescriptionState] = useEventStateProps('description')
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
