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

export default function EventInfo({
  launcher,
  description,
  infoOnchange,
  desOnchange,
}) {
  return (
    <ListItem text="活動資訊">
      <ItemContentBlock>
        <TextField
          label="活動主辦人"
          variant="outlined"
          size="small"
          value={launcher}
          onChange={infoOnchange}
        />
      </ItemContentBlock>
      <ItemContentBlock>
        <Multiline
          label="活動附註"
          multiline
          rows={5}
          value={description}
          size="small"
          variant="outlined"
          onChange={desOnchange}
        />
      </ItemContentBlock>
    </ListItem>
  );
}
