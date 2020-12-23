import React, { useState } from "react";
import styled from "styled-components";

import MuiDrawer from "@material-ui/core/Drawer";
import MuiList from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";

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
    flex-shrink: 0;
  }
`;

const SidebarList = styled(MuiList)`
  /* flex-grow: 4; */
  flex-grow: 1;
  overflow: scroll;
`;

const SidebarBottom = styled.div`
  padding: 16px 16px; /* refer to Mui */
  box-sizing: border-box;
  background-color: white;
  flex-shrink: 0;
  .sidebar__bottomBtnContainer {
    display: flex;
    & button + button {
      margin-left: 8px;
    }
  }

  .sidebar__bottomErrorMessage {
    font-size: 1rem;
    /* text-align: center; */
    padding-bottom: var(--spacing);
  }
  /* flex-wrap: nowrap; */
`;

const StyledTab = styled(Tab)`
  &.MuiTab-root {
    min-width: auto;
  }
`;

export default function Sidebar({
  children,
  SidebarBottomItems,
  errorMessage,
}) {
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
      <SidebarBottom>
        <FormHelperText className="sidebar__bottomErrorMessage" error>
          {errorMessage}
        </FormHelperText>
        <div className="sidebar__bottomBtnContainer">{SidebarBottomItems}</div>
      </SidebarBottom>
    </SideBarContainer>
  );
}
