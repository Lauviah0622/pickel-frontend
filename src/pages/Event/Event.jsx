import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import ListBottomButton from "../../components/List/ListBottomButton.jsx";
import EventName from "./SidebarItems/EventName";
import EventDuration from "./SidebarItems/EventDuration";
import EventPickRange from "./SidebarItems/EventPickRange";
import EventInfo from "./SidebarItems/EventInfo";
import EventRange from "./SidebarItems/EventRange";
import EventAddRange from "./SidebarItems/EventAddRange";
import ListItem from "../../components/List/ListItem.jsx";
// eslint-disable-next-line no-unused-vars
import { createEventReq } from "../../redux/features/fetchSlice/fetchSlice";

const EventContainer = styled.div``;

export default function Event() {
  const history = useHistory();

  const { status } = useSelector((store) => store.statusState);
  const { isRangesAllValid } = useSelector((store) => store.eventState);
  // eslint-disable-next-line no-unused-vars

  // TODO: [phase2]allday 還有 part 要有不同的選擇器（之後再做）

  // TODO: **加上 prop-types**

  const handleBeforeUnload = (e) => {
    const message = "o";
    (e || window.event).returnValue = message;
    return message;
  };

  if (!status) {
    history.push("/");
  }

  // 這裡不太確定能不能這樣用，但目前似乎沒問題
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCreateEvent = () => {
    // dispatch(createEventReq(event));
  };

  const Pannels = {
    活動資訊: (
      <>
        <EventName />
        <EventDuration />
        <EventPickRange />
        <EventInfo />
      </>
    ),
    預計舉辦時間範圍: (
      <>
        <ListItem text="預計舉辦時間">
          <EventRange/>
          <EventAddRange />
        </ListItem>
      </>
    ),
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
              onClick={handleCreateEvent}
              disabled={!isRangesAllValid}
            >
              建立活動
            </ListBottomButton>
          </>
        }
        errorMessage={!isRangesAllValid && '預計舉辦時間錯誤'}
      >
        {Pannels}
      </Sidebar>
    </EventContainer>
  );
}
