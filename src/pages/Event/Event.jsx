import React, { useState } from "react";
import styled from "styled-components";

import MuiButton from "@material-ui/core/Button";

import Sidebar from "../../components/Sidebar";
import EventName from "./ListItems/EventName";
import EventDuration from "./ListItems/EventDuration";
import EventPickRange from "./ListItems/EventPickRange";
import EventInfo from "./ListItems/EventInfo";
import EventSetting from "./ListItems/EventSetting";

const EventContainer = styled.div``;

const Button = styled(MuiButton)`
  flex-grow: 0;
  flex-shrink: 0;
  ${(props) =>
    props.alert &&
    `
      background-color: ${props.theme.palette.error.main};
      color: ${props.theme.palette.error.contrastText};
      &:hover {
        background-color: ${props.theme.palette.error.dark};
      }
  `}
  ${(props) =>
    props.main &&
    `
      flex-grow: 1;
      flex-shrink: 1;
      width: 100%;
      padding: 8px 22px;
      font-size: 0.9375rem;
      }
  `}
`;

const SidebarBottomItems = (
  <>
    <Button variant="contained" alert>
      Primary
    </Button>
    <Button variant="contained" color="primary" main>
      Primary
    </Button>
  </>
);

export default function Event() {
  const [isAllday, setIsAllday] = useState(false);
  const [duration, setDuration] = useState(1);
  const [eventName, setEventName] = useState("酉社圖書會");
  const toggleIsAllday = () => {
    setIsAllday(!isAllday);
    setDuration(1);
  };

  const Pannels = {
    '活動資訊': (
      <>
        <EventName value={eventName} setEventName={setEventName} />
        <EventDuration
          duration={duration}
          isAllday={isAllday}
          toggleIsAllday={toggleIsAllday}
          setDuration={setDuration}
        />
        <EventPickRange />
        <EventInfo />
        <EventSetting />
      </>
    )
  };
  
  return (
    <EventContainer>
      <Sidebar
        SidebarBottomItems={SidebarBottomItems}
      >
        {Pannels}
      </Sidebar>
    </EventContainer>
  );
}
