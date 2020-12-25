import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../../layout/Sidebar/Sidebar.jsx";
import ListBottomButton from "../../layout/Sidebar/SidebarFooterBtn.jsx";
import EventName from "./SidebarItems/EventName";
import EventDuration from "./SidebarItems/EventDuration";
import EventPickRange from "./SidebarItems/EventPickRange";
import EventInfo from "./SidebarItems/EventInfo";
import EventRange from "./SidebarItems/EventRange";
import EventAddRange from "./SidebarItems/EventAddRange";
import ListItem from "../../layout/Sidebar/PanelItem.jsx";
import { fetchEvent } from "../../redux/features/fetch/fetchSlice";

const EventContainer = styled.div``;
/* eslint-disable */
export default function Event() {
  const history = useHistory();
  const { suffix } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.statusState);
  const { isRangesAllValid, event, eventState } = useSelector(
    (store) => store.eventState
  );

  useEffect(() => {
    dispatch(fetchEvent(suffix));
  }, [suffix]);

  // TODO: 這個視窗要在做好一點，目前先這樣
  const handleBeforeUnload = (e) => {
    const message = "o";
    (e || window.event).returnValue = message;
    return message;
  };

  // 這裡不太確定能不能這樣用，但目前似乎沒問題
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCreateEvent = async () => {};

  // FIXME:　改成用 array，然後是 {name, content} 的形式
  const Pannels = [
    {
      label: "活動資訊",
      content: (
        <>
          <EventName />
          <EventDuration />
          <EventPickRange />
          <EventInfo />
        </>
      ),
    },
    {
      label: "預計舉辦時間範圍",
      content: (
        <>
          <ListItem text="預計舉辦時間">
            <EventRange />
            <EventAddRange />
          </ListItem>
        </>
      ),
    },
  ];

  const errorMessage = (() => {
    if (event.ranges.length < 1) return "還沒填入預計舉辦時間";
    if (!isRangesAllValid) return "預計舉辦時間錯誤";
    return null;
  })();

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
              disabled={!!errorMessage}
            >
              建立活動
            </ListBottomButton>
          </>
        }
        errorMessage={errorMessage}
      >
        {Pannels}
      </Sidebar>
    </EventContainer>
  );
}
