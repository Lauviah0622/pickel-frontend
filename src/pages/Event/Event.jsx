import React, { useState } from "react";
import styled from "styled-components";

import Sidebar from "../../components/Sidebar";
import ListBottomButton from "../../components/List/ListBottomButton.jsx";
import EventName from "./SidebarItems/EventName";
import EventDuration from "./SidebarItems/EventDuration";
import EventPickRange from "./SidebarItems/EventPickRange";
import EventInfo from "./SidebarItems/EventInfo";
import EventSetting from "./SidebarItems/EventSetting";
import PickOverview from "./SidebarItems/PickOverview";
import PickTimeFilter from "./SidebarItems/PickTimeFilter";

const EventContainer = styled.div``;

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
  const [isAllday, setIsAllday] = useState(false);
  const [duration, setDuration] = useState(1);
  const [eventName, setEventName] = useState("酉社圖書會");
  const toggleIsAllday = () => {
    setIsAllday(!isAllday);
    setDuration(1);
  };

  const Pannels = {
    活動資訊: (
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
    ),
    投票時段資訊: (
      <>
        <PickTimeFilter />
        <PickOverview />
      </>
    ),
  };

  return (
    <EventContainer>
      <Sidebar SidebarBottomItems={SidebarBottomItems}>{Pannels}</Sidebar>
    </EventContainer>
  );
}
