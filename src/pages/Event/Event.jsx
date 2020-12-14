import React, { useState } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

import Sidebar from "../../components/Sidebar";
import EventName from "./ListItems/EventName";
import EventDuration from "./ListItems/EventDuration";
import EventPickRange from "./ListItems/EventPickRange";
import EventInfo from "./ListItems/EventInfo";

const EventContainer = styled.div``;

const SidebarBottomItems = () => (
  <>
    <Button variant="contained" color="primary" fullWidth>
      Primary
    </Button>
  </>
);

export default function Event() {
  const [isAllday, setIsAllday] = useState(false);
  const [duration, setDuration] = useState(1);
  const [eventName, setEventName] = useState('酉社圖書會');
  const toggleIsAllday = () => {
      setIsAllday(!isAllday);
      setDuration(1);
  }
  return (
    <EventContainer>
      <Sidebar SidebarBottomItems={SidebarBottomItems}>
        <EventName value={eventName} setEventName={setEventName}/>
        <EventDuration 
        duration={duration} 
        isAllday={isAllday} 
        toggleIsAllday={toggleIsAllday}
        setDuration={setDuration}
        />
        <EventPickRange/>
        <EventInfo/>
      </Sidebar>
    </EventContainer>
  );
}
