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
import Determined from './SidebarContents/Determined.jsx';
import PrePicking from './SidebarContents/PrePicking.jsx';

import { fetchEvent } from "../../redux/features/fetch/fetchSlice";

const EventContainer = styled.div``;
/* eslint-disable */



export default function Event() {
  const history = useHistory();
  const { suffix } = useParams();
  const dispatch = useDispatch();
  const { isRangesAllValid, event, eventState } = useSelector(
    (store) => store.eventState
  );

  console.log(event);
  console.log(eventState);

  useEffect(() => {
    dispatch(fetchEvent(suffix))
      .catch(() => {
        history.push('/')
      });
  }, [suffix, history]);

  // TODO: 這個視窗要在做好一點，目前先這樣
  // 設定離開的彈跳視窗，這邊還沒有深究

  const handleBeforeUnload = (e) => {
    const message = "o";
    (e || window.event).returnValue = message;
    return message;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCreateEvent = async () => { };
  
  const sidebarContent = (eventState) => {
    switch (eventState) {
      case 'determined':
        return <Determined/>
      case 'postPicking':
        return (
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
          {[
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
        ]}
        </Sidebar>
        )
      case 'picking':
        return (
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
          {[
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
        ]}
        </Sidebar>
        )
      case 'prePicking':
        return <PrePicking/>
      default: 
        return 'error'
        // 這裡要再想想預設行為是怎麼樣
    }
  }

  const errorMessage = (() => {
    if (event.ranges.length < 1) return "還沒填入預計舉辦時間";
    if (!isRangesAllValid) return "預計舉辦時間錯誤";
    return null;
  })();

 



  return (
    <EventContainer>
      {sidebarContent(eventState)}
    </EventContainer>
  );
}
