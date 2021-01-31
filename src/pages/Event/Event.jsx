import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Determined from './SidebarContents/Determined.jsx';
import PostPicking from './SidebarContents/PostPicking.jsx';
import PrePicking from './SidebarContents/PrePicking.jsx';
import Picking from './SidebarContents/Picking.jsx';

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

  const sidebarContent = (eventState) => {
    switch (eventState) {
      case 'determined':
        return <Determined/>
      case 'postPicking':
        return <PostPicking/>
      case 'picking':
        return <Picking/>
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
