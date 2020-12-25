import React from "react";
import styled from "styled-components";

import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from "@material-ui/core/ListItemText";


const ListItemText = styled(MuiListItemText)`
  .MuiListItemText-primary {
    font-size: 1rem;
  }
  /* display: block; */
`;

const ListItemContent = styled.div``;

const ListItem = ({text, children, className}) => (
  <MuiListItem className={className}>
    <ListItemText>{text}</ListItemText>
    <ListItemContent>{children}</ListItemContent>
  </MuiListItem>
);

const StyledListItem = styled(ListItem)`
  &.MuiListItem-root {
    display: block;
    width: 100%;
    padding-bottom: 0;
  }
`;

export default StyledListItem;
