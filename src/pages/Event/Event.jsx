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
import Range from "./SidebarItems/Range";
import AddRange from "./SidebarItems/AddRange";
import ListItem from "../../components/List/ListItem.jsx";
import { createEventReq } from "../../redux/features/fetchSlice/fetchSlice";
import Modal from "../../components/Modal";

const EventContainer = styled.div``;

export default function Event() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { event} = useSelector((store) => store.eventState);
  const { status } = useSelector((store) => store.statusState);

  // eslint-disable-next-line no-unused-vars
  const [modalContent, setModalContent] = useState("");


  /** TODO: 原本是主動叫出 localsotrage 的功能，現在的想法是
   * 1. 每次改動資料時都把內容存在 event
   * 2. 重新進來（entry），發現有存檔時，讓使用者決定要不要讀入存檔
   * 3. [x] 如果在 編輯活動的部份重新整理，一律直接跳回 entry 
   */
  
  // TODO: 重構rrr

  // TODO: allday 還有 part 要有不同的選擇器（之後再做）

  const handleBeforeUnload = (e) => {
    const message = "o";
    (e || window.event).returnValue = message;
    return message;
  };

  if (!status) {
    history.push('/')
  }

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

  /**
   * TODO: 錯誤訊息有兩種作法 
   * 1. 錯誤訊息只在 UI 上面檢查，不改變 state => 比較不耗資源
   * 2. state 改變就做檢查，這個很耗資源，如果要這樣做可能要用 throlltle 來處理
   */

  const handleCreateEvent = () => {
    dispatch(createEventReq(event));
  };

  const Pannels = {
    活動資訊: (
      <>
        <EventName/>
        <EventDuration/>
        <EventPickRange/>
        <EventInfo/>
      </>
    ),
    預計舉辦時間範圍: (
      <>
        <ListItem text="預計舉辦時間">
          <Range />
          <AddRange />
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
