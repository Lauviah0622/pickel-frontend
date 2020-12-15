import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";

import ListItem from "../../../../components/List/ListItem.jsx";

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
  return (
    <ListItem text="活動資訊">
      <ItemContentBlock>
        <TextField 
        label="活動主辦人"
        defaultValue="Hello World"
        variant="outlined"
        size="small"
        />
      </ItemContentBlock>
      <ItemContentBlock>
        <Multiline 
          label="活動附註"
          multiline
          rows={5}
          defaultValue="Default Value"
          size="small"
          variant="outlined"
          />
      </ItemContentBlock>
    </ListItem>
  );
}
