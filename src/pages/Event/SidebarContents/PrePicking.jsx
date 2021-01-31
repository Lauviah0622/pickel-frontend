import React from "react";

import { useDispatch } from "react-redux";

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

import {
  deleteRange,
  addNoRepeatRange,
} from "../../../redux/features/event/eventSlice";

export default function Prepicking() {
  const [eventDurationState, setEventDurationState] = useEventStateProps("duration");
  const [eventNameState, setEventNameState] = useEventStateProps("name");
  const [eventPickStartState, setEventPickStartState] = useEventStateProps("pickStart");
  const [eventPickEndState, setEventPickEndState] = useEventStateProps("pickEnd");
  const [eventLauncherState, setEventLauncherState] = useEventStateProps("launcher");
  const [eventDescriptionState, setEventDescriptionState] = useEventStateProps("description");
  const [eventTypeState, setEventTypeState] = useEventStateProps("eventType");
  const [eventRanges] = useEventStateProps("ranges");

  const dispatch = useDispatch();
  const deleteRangeHandlerCreator = (i) => {
    dispatch(deleteRange(i));
  };
  const addRange = (start, end) => {
    dispatch(addNoRepeatRange({ start, end }));
  };
  return (
    <Sidebar
      SidebarBottomItems={
        <>
          <ListBottomButton
            variant="contained"
            color="primary"
            mainTheme={true}
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
