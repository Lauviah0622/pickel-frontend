import React from "react";
import styled from "styled-components";

import Sidebar from "../../components/Sidebar";
import ListBottomButton from '../../components/List/ListBottomButton.jsx';

const Container = styled.div`
  `

const SidebarBottomItems = (
  <>
    <ListBottomButton variant="contained" alertTheme={true}>
      Primary
    </ListBottomButton>
    <ListBottomButton variant="contained" color="primary" mainTheme={true}>
      Primary
    </ListBottomButton>
  </>
);

export default function Event() {

  const Pannels = {
    '活動資訊': (
      <>
      </>
    )
  };
  
  return (
    <Container>
      <Sidebar
        SidebarBottomItems={SidebarBottomItems}
      >
        {Pannels}
      </Sidebar>
    </Container>
  );
}
