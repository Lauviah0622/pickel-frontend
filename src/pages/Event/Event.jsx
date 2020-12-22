import React, { useEffect, useState } from "react";
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
import Range from "./SidebarItems/Range";
import AddRange from "./SidebarItems/AddRange";
import ListItem from "../../components/List/ListItem.jsx";
import {
  setEventData,
  addNoRepeatRange,
} from "../../redux/features/event/eventSlice";
import { getEventLocalStorage, setEventLocalStorage } from "../../utils";
import { createEventReq } from "../../redux/features/fetchSlice/fetchSlice";
import Modal from "../../components/Modal";

const EventContainer = styled.div``;

export default function Event() {
  const dispatch = useDispatch();
  const history = useHistory();
  const event = useSelector((store) => store.eventState);
  const [addRangeError, setAddRangeError] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // TODO: 這邊重新整理的流程(localstorage 根 redux 要什麼時候同步)要在想一下
  // TODO: 重構rrr

  // TODO: allday 還有 part 要有不同的選擇器（之後再做）

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

  useEffect(() => {
    setEventLocalStorage(event);
  }, [event]);

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

  // TODO: 這裡丑到榨欸...是不是可以用事件代理來處理？ => 可以加上 name，然後全部用同一個 handle 處理
  // TODO: **加上 prop-types**
  // TODO: 明天來處理 1. modal 的東西，包含錯誤處理
  // TODO: 把 component 整理一下

  const handleEventNameChange = (e) => {
    dispatch(setEventData({ name: e.target.value }));
  };

  const handleAlldayOnChange = (e) => {
    dispatch(
      setEventData({
        eventType: e.target.checked ? "allday" : "part",
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

  const handlePickStartChange = (dateTime) => {
    dispatch(setEventData({ pickStart: dateTime }));
  };
  const handlePickEndChange = (dateTime) => {
    dispatch(setEventData({ pickEnd: dateTime }));
  };

  const handleAddRange = (range) => {
    dispatch(addNoRepeatRange(range))
      .then(() => setAddRangeError(false))
      .catch(() => setAddRangeError(true));
  };

  const resetAddRangeError = () => {
    setAddRangeError(false);
  };

  const clearModal = () => {
    setModalContent("");
  };

  const handleCreateEvent = () => {
    if (event.name.length < 1) {
      setModalContent();
    }
    dispatch(createEventReq(event));
  };

  const Pannels = {
    活動資訊: (
      <>
        <EventName
          value={event.name}
          onChange={handleEventNameChange}
          onClose={clearModal}
        />
        <EventDuration
          duration={event.duration}
          isAllday={event.eventType === "allday"}
          alldayOnChange={handleAlldayOnChange}
          durationOnChange={handleDurationOnChange}
        />
        <EventPickRange
          start={event.pickStart}
          end={event.pickEnd}
          onStartChange={handlePickStartChange}
          onEndChange={handlePickEndChange}
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
    可參與時間範圍: (
      <>
        <ListItem text="預計舉辦時間">
          <Range ranges={event.ranges} />
          <AddRange
            addRange={handleAddRange}
            addRangeError={addRangeError}
            resetAddRangeError={resetAddRangeError}
            type={event.eventType}
          />
        </ListItem>
      </>
    ),
  };

  return (
    <EventContainer>
      <Modal open={modalContent.length > 0} content={modalContent} />
      <Sidebar
        SidebarBottomItems={
          <>
            <ListBottomButton
              variant="contained"
              color="primary"
              mainTheme={true}
              onClick={handleCreateEvent}
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
