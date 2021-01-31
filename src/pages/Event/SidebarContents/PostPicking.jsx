import React from "react";

import Sidebar from "../../../layout/Sidebar/Sidebar.jsx";
import ListBottomButton from "../../../layout/Sidebar/SidebarFooterBtn.jsx";
import PanelItem from "../../../layout/Sidebar/PanelItem.jsx";

import EventDuration from "../../../components/Sidebar/EventDuration";
import EventName from "../../../components/Sidebar/EventName";
import EventInfo from "../../../components/Sidebar/EventInfo";
import EventPickRange from "../../../components/Sidebar/EventPickRange";
import EventRange from "../../../components/Sidebar/EventRange";

import useEventStateProps from "../../../hooks/useEventStateProps";

export default function Postpicking() {
  const [eventDurationState, setEventDurationState] = useEventStateProps(
    "duration"
  );
  const [eventNameState, setEventNameState] = useEventStateProps("name");
  const [eventPickStartState] = useEventStateProps(
    "pickStart"
  );
  const [eventPickEndState] = useEventStateProps(
    "pickEnd"
  );
  const [eventLauncherState, setEventLauncherState] = useEventStateProps(
    "launcher"
  );
  const [eventDescriptionState, setEventDescriptionState] = useEventStateProps(
    "description"
  );
  const [eventTypeState] = useEventStateProps("eventType");
  const [eventRanges] = useEventStateProps("ranges");

  return (
    <Sidebar
      SidebarBottomItems={
        <>
          <ListBottomButton
            variant="contained"
            color="primary"
            mainTheme={true}
          >
            確定活動資訊
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
              />
              <EventPickRange
                eventType={eventTypeState}
                eventDuration={eventDurationState}
                eventPickStart={eventPickStartState}
                eventPickEnd={eventPickEndState}
              />
              <EventInfo
                eventLauncher={eventLauncherState}
                eventDescription={eventDescriptionState}
                setEventDescription={setEventDescriptionState}
                setEventLauncher={setEventLauncherState}
              />
              <PanelItem text="預計舉辦時間">
                <EventRange
                  eventRanges={eventRanges}
                  eventPickEnd={eventPickEndState}
                  eventType={eventTypeState}
                  eventDuration={eventDurationState}
                />
              </PanelItem>
            </>
          ),
        },
        {
          label: "投票狀況",
          content: (
            <>
              <PanelItem text="投票狀況"></PanelItem>
            </>
          ),
        },
      ]}
    </Sidebar>
  );
}
