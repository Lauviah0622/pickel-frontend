import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Sidebar from "../../layout/Sidebar/Sidebar.jsx";
import ListBottomButton from "../../layout/Sidebar/SidebarFooterBtn.jsx";
import EventName from "./SidebarItems/EventName";
import EventDuration from "./SidebarItems/EventDuration";
import EventPickRange from "./SidebarItems/EventPickRange";
import EventInfo from "./SidebarItems/EventInfo";
import EventRange from "./SidebarItems/EventRange";
import EventAddRange from "./SidebarItems/EventAddRange";
import ListItem from "../../layout/Sidebar/PanelItem.jsx";
import { createEventReq } from "../../redux/features/fetch/fetchSlice";

const EventContainer = styled.div``;

export default function Event() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.statusState);
  const { isRangesAllValid, event } = useSelector((store) => store.eventState);

  // TODO: [phase2]allday 還有 part 要有不同的選擇器（之後再做）
  // TODO: **加上 prop-types**

  // 離開視窗提醒
  const handleBeforeUnload = (e) => {
    const message = "o";
    (e || window.event).returnValue = message;
    return message;
  };

  useEffect(() => {
    if (status !== 'client') {
      // 一定要有 entry 設定的 client 才可以近來
      history.push('/')
    }
  }, [status, history])
  
// 設定離開的彈跳視窗，這邊還沒有深究
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCreateEvent = async () => {
    if (status !== "client" || isRangesAllValid !== true) return;
    const eventSuffix = await dispatch(createEventReq(event));
    history.push(`event/${eventSuffix}`);
  };

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
