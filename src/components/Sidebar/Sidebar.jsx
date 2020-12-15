import React, { useState } from "react";
import styled from "styled-components";

import MuiDrawer from "@material-ui/core/Drawer";
import MuiList from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "var(--drawer-width)";
const SideBarContainer = styled(MuiDrawer)`
  width: ${drawerWidth};
  flex-shrink: 0;

  .MuiPaper-root {
    padding-bottom: 16px;
    width: ${drawerWidth};
    display: flex;
    flex-direction: column;
  }
`;

const SidebarList = styled(MuiList)`
  flex-grow: 4;
`;

const SidebarBottom = styled.div`
  padding: 16px 16px; /* refer to Mui */
  display: flex;
  /* flex-wrap: nowrap; */
  & button + button {
    margin-left: 8px;
  }
`;

const StyledTab = styled(Tab)`
  &.MuiTab-root {
    min-width: auto;
  }
`;

const useToobarStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function Sidebar({ children, SidebarBottomItems }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { toolbar: toolbarClass } = useToobarStyle();
  return (
    <SideBarContainer variant="permanent" anchor="left">
      <div className={toolbarClass} />
      <Divider />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
      >
        {Object.keys(children).map((PannelTag, index, keys) => (
          <StyledTab
            label={PannelTag}
            id={index}
            disableRipple={keys.length === 1}
            style={{ cursor: keys.length === 1 && "unset" }}
            key={`tab-${index}`}
          />
        ))}
      </Tabs>
      <Divider />
      {Object.values(children).map((PannelContent, index) => (
        <SidebarList
          value={value}
          index={index}
          hidden={value !== index}
          key={`SidebarList-${index}`}
        >
          {PannelContent}
        </SidebarList>
      ))}

      <SidebarBottom>{SidebarBottomItems}</SidebarBottom>
    </SideBarContainer>
  );
}
