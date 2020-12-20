import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import ListBottomButton from "../../components/List/ListBottomButton.jsx";
import EventName from "./SidebarItems/EventName";
import EventDuration from "./SidebarItems/EventDuration";
import EventPickRange from "./SidebarItems/EventPickRange";
import EventInfo from "./SidebarItems/EventInfo";
import EventSetting from "./SidebarItems/EventSetting";

import { setEventData } from "../../redux/features/event/eventSlice";
import { getEventLocalStorage, setEventLocalStorage } from "../../utils";

const EventContainer = styled.div``;

export default function Event() {
  const dispatch = useDispatch();
  const history = useHistory();

  const event = useSelector((store) => store.eventState);

  useEffect(() => {
    const localUnsaveEvent = getEventLocalStorage();
    if (!localUnsaveEvent) {
      if (event.name.length !== 0) {
        setEventLocalStorage(event);
      } else {
        history.push("/");
      }
      return;
    }
    dispatch(setEventData(localUnsaveEvent));
  }, []);

  console.log("event", event);

  useEffect(() => {
    setEventLocalStorage(event);
  }, [event]);

  // {name: e.target.value}

  const handleEventNameChange = (e) => {
    console.log("change");
    dispatch(setEventData({ name: e.target.value }));
  };

  const handleAlldayOnChange = (e) => {
    dispatch(
      setEventData({
        type: e.target.checked ? "allday" : "part",
        duration: 1,
      })
    );
  };

  const handleDurationOnChange = (e) => {
    dispatch(setEventData({ duration: e.target.value }));
  };

  const handleLauncherChange = (e) => {
    dispatch(setEventData({ launcher: e.target.value }));
  };
  const handleDesChange = (e) => {
    dispatch(setEventData({ description: e.target.value }));
  };

  const handleHoldingChange = (prop) => {
    return (dateTime) => {
      console.log(dateTime)
      dispatch(setEventData({ [prop]: dateTime }));
    };
  };

  const Pannels = {
    活動資訊: (
      <>
        <EventName value={event.name} onChange={handleEventNameChange} />
        <EventDuration
          duration={event.duration}
          isAllday={event.type === "allday"}
          alldayOnChange={handleAlldayOnChange}
          durationOnChange={handleDurationOnChange}
        />
        <EventPickRange
          start={event.pickStart}
          end={event.pickEnd}
          onStartChange={handleHoldingChange("pickStart")}
          onEndChange={handleHoldingChange("pickEnd")}
        />
        <EventInfo
          launcher={event.launcher}
          description={event.description}
          infoOnchange={handleLauncherChange}
          desOnchange={handleDesChange}
        />
        <EventSetting />
      </>
    ),
  };

  /* ,
    投票時段資訊: (
      <>
        <PickTimeFilter />
        <PickOverview />
      </>
    ), */

  const logState = () => {
    console.log(event);
  };

  return (
    <EventContainer>
      <Sidebar
        SidebarBottomItems={
          <>
            <ListBottomButton
              variant="contained"
              color="primary"
              mainTheme={true}
              onClick={logState}
            >
              建立活動
            </ListBottomButton>
          </>
        }
      >
        {Pannels}
      </Sidebar>
    </EventContainer>
  );
}
