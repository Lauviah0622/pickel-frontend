import React from "react";
import styled from "styled-components";

import Sidebar from "../../components/Sidebar";
// import SelectField from '../../components/List/SelectField.jsx';
import ListBottomButton from '../../components/List/ListBottomButton.jsx';

const Container = styled.div``;

const SidebarBottomItems = (
  <>
    <ListBottomButton variant="contained" alert>
      Primary
    </ListBottomButton>
    <ListBottomButton variant="contained" color="primary" main>
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
