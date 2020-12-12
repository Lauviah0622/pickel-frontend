import React from "react";
import styled from "styled-components";

import MuiDrawer from "@material-ui/core/Drawer";
import MuiAppBar from "@material-ui/core/AppBar";
import MuiToolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import MuiListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';


import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';


const drawerWidth = "var(--drawer-width)";
const SideBar = styled(MuiDrawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
  .MuiDrawer-paper {
    width: ${drawerWidth};
  }
`;

const Appbar = styled(MuiAppBar)`
    &.MuiAppBar-root {
        width: calc(100% - ${drawerWidth});
        margin-left: ${drawerWidth};
    }
`;

const useToobarStyle = makeStyles((theme) => ({toolbar: theme.mixins.toolbar}));


const ListItem = styled(MuiListItem)`
  &.MuiListItem-root {
    display: block;
    width: 100%;
  }

`;

const ListItemText = styled(MuiListItemText)`
  /* display: block; */

`;

const ListItemContent = styled.div``;


export default function Event() {
    const { toolbar: toolbarClass } = useToobarStyle();
  return (
    <>
      <SideBar variant="permanent" anchor="left">
        <div className={toolbarClass}>

        </div>
        <Divider/>
        <List>
            <ListItem>
              <ListItemText>活動名稱</ListItemText>
              <ListItemContent>
                <Input value="酉社讀書會" style={{width: '100%'}}></Input>
              </ListItemContent>
            </ListItem>
        </List>
      </SideBar>
      <Appbar>
        <MuiToolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </MuiToolbar>
      </Appbar>
    </>
  );
}
