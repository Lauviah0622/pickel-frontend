import React, { useState } from "react";
import styled from "styled-components";

import MuiDrawer from "@material-ui/core/Drawer";
import MuiList from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Divider from "@material-ui/core/Divider";

const drawerWidth = "var(--drawer-width)";
const SideBarContainer = styled(MuiDrawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
  > .MuiPaper-root {
    box-sizing: border-box;
    padding-top: 64px;
    /* padding-bottom: px; */
    width: ${drawerWidth};
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tabContainer {
    flex-grow: 1;
    /* overflow-y: hidden; */
  }

  .tabs {
    flex-shrink:0;
  }


`;

const SidebarList = styled(MuiList)`
  /* flex-grow: 4; */
  flex-grow: 1;
    overflow: scroll;
`;

const SidebarBottom = styled.div`
  padding: 16px 16px; /* refer to Mui */
  display: flex;
  box-sizing: border-box;
  background-color: white;
  flex-shrink:0;

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

export default function Sidebar({ children, SidebarBottomItems }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SideBarContainer variant="permanent" anchor="left">
      <Divider />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        className="tabs"
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
