import React from "react";
import styled from "styled-components";

import MuiDrawer from "@material-ui/core/Drawer";
import MuiList from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "var(--drawer-width)";
const SideBar = styled(MuiDrawer)`
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
`;

const useToobarStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));
// const useToobarStyle = makeStyles((theme) => ({toolbar: theme.mixins.toolbar}));

export default function Sidebar({ children, SidebarBottomItems }) {
  const { toolbar: toolbarClass } = useToobarStyle();
  return (
    <SideBar variant="permanent" anchor="left">
      <div className={toolbarClass} />
      <Divider />
      <SidebarList>
        {children}
      </SidebarList>
      <SidebarBottom>
        {SidebarBottomItems && <SidebarBottomItems />}
      </SidebarBottom>
    </SideBar>
  );
}
