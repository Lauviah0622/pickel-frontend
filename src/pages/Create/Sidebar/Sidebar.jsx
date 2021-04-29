import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../../layout/Sidebar/Sidebar.jsx";
import ListBottomButton from "../../../layout/Sidebar/SidebarFooterBtn.jsx";
import ListItem from "../../../layout/Sidebar/PanelItem.jsx";

import EventDuration from "../../../components/Sidebar/EventDuration";
import EventName from "../../../components/Sidebar/EventName";
import EventInfo from "../../../components/Sidebar/EventInfo";
import EventPickRange from "../../../components/Sidebar/EventPickRange";
import EventRange from "../../../components/Sidebar/EventRange";
import EventAddRange from "../../../components/Sidebar/EventAddRange";

import useEventStateProps from "../../../hooks/useEventStateProps";

import {createEventReq} from '../../../redux/features/fetch/fetchSlice';

import {
  deleteRange,
  addNoRepeatRange,
} from "../../../redux/features/event/eventSlice";

import { getEventValidationResult } from '../../../utils';


/* eslint-disable */
function getErrorMessages (eventValidationResult) {
  const errorMessages = [];
  switch (false) {
    case eventValidationResult.noName:
      errorMessages.push('未輸入活動名稱');
    
    case eventValidationResult.noRanges:
      errorMessages.push('未加入預計舉辦時間');
    
    default:
      return errorMessages
  }
}

/* eslint-enable */

export default function CreateSidebar({handleModalOpen}) {
  const [eventDurationState, setEventDurationState] = useEventStateProps("duration");
  const [eventNameState, setEventNameState] = useEventStateProps("name");
  const [eventPickStartState, setEventPickStartState] = useEventStateProps("pickStart");
  const [eventPickEndState, setEventPickEndState] = useEventStateProps("pickEnd");
  const [eventLauncherState, setEventLauncherState] = useEventStateProps("launcher");
  const [eventDescriptionState, setEventDescriptionState] = useEventStateProps("description");
  const [eventTypeState, setEventTypeState] = useEventStateProps("eventType");
  const [eventRanges] = useEventStateProps("ranges");
  const eventState = useSelector((state) => state.eventState.event);

  const eventValidation = getEventValidationResult(eventState);
  const errorMessage = getErrorMessages(eventValidation.res).join(`, `);

  const dispatch = useDispatch();
  const deleteRangeHandlerCreator = (i) => {
    dispatch(deleteRange(i));
  };
  const addRange = (start, end) => {
    dispatch(addNoRepeatRange({ start, end }));
  };

  const createEventHandler = async () => {
    const res = await dispatch(createEventReq());
    console.log(res);
  }

  

  return (
    <Sidebar
      errorMessage={errorMessage}
      SidebarBottomItems={
        <>
          
          <ListBottomButton
            variant="contained"
            color="primary"
            mainTheme={true}
            onClick={createEventHandler}
            disabled={!eventValidation.ok}
          >
            建立活動資訊頁
          </ListBottomButton>
        </>
      }
    >
      {[
        {
          label: "活動資訊",
          content: (
            <>
              <EventName
                eventName={eventNameState}
                setEventName={setEventNameState}
              />
              <EventDuration
                eventDuration={eventDurationState}
                eventType={eventTypeState}
                setEventDuration={setEventDurationState}
                setEventType={setEventTypeState}
              />
              <EventPickRange
                eventType={eventTypeState}
                eventDuration={eventDurationState}
                eventPickStart={eventPickStartState}
                eventPickEnd={eventPickEndState}
                setEventPickStart={setEventPickStartState}
                setEventPickEnd={setEventPickEndState}
              />
              <EventInfo
                eventLauncher={eventLauncherState}
                eventDescription={eventDescriptionState}
                setEventDescription={setEventDescriptionState}
                setEventLauncher={setEventLauncherState}
              />
            </>
          ),
        },
        {
          label: "預計舉辦時間範圍",
          content: (
            <>
              <ListItem text="預計舉辦時間">
                <EventRange
                  eventRanges={eventRanges}
                  eventPickEnd={eventPickEndState}
                  eventType={eventTypeState}
                  eventDuration={eventDurationState}
                  deleteRangeHandlerCreator={deleteRangeHandlerCreator}
                />
                <EventAddRange
                  eventRanges={eventRanges}
                  eventPickEnd={eventPickEndState}
                  eventType={eventTypeState}
                  eventDuration={eventDurationState}
                  addRange={addRange}
                />
              </ListItem>
            </>
          ),
        },
      ]}
    </Sidebar>
  );
}
