import React, { useEffect, useState } from "react";
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
import Modal from "../../components/Modal";

const EventContainer = styled.div``;

export default function Event() {
  const history = useHistory();
  const { event, propsValidation } = useSelector((store) => store.eventState);
  const { status } = useSelector((store) => store.statusState);

  // eslint-disable-next-line no-unused-vars
  const [modalContent, setModalContent] = useState("");


  /** TODO: 原本是主動叫出 localsotrage 的功能，現在的想法是
   * 1. 每次改動資料時都把內容存在 event
   * 2. 重新進來（entry），發現有存檔時，讓使用者決定要不要讀入存檔
   * 3. [x] 如果在 編輯活動的部份重新整理，一律直接跳回 entry 
   */
  // TODO: [phase2]allday 還有 part 要有不同的選擇器（之後再做）
  
  // TODO: **加上 prop-types**
  // TODO: 處理modal 的東西
  
  /**
   * TODO: [phase0]error message 的管理
   * 1. 錯誤訊息只在 UI 上面檢查，不改變 state => 比較不耗資源
   * 2. state 改變就做檢查，這個很耗資源，如果要這樣做可能要用 throlltle 來處理
   * 
   * 最後決定 => 
   * 1. [x] 資料個別的錯誤，個別顯示錯誤訊息，寫在 component 裡面 像是 add range 的錯誤
   * 
   * 2. 共有的錯誤 ex: 設定好 range 之後 range 不能小於 duration，寫在 state 裡面
   * 
   * 
   * TODO: 幫錯誤的 range 加上 hightlight
   * TODO: 加上一個 event 範圍的錯誤只是在 button 上面
   */

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


  const handleCreateEvent = () => {
    console.log(event)
    console.log(propsValidation)
    // dispatch(createEventReq(event));
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
          <EventRange />
          <EventAddRange />
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
