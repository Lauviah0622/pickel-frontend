import React from "react";

import EventDuration from "../../../components/Sidebar/EventDuration";
import EventName from "../../../components/Sidebar/EventName";
import EventInfo from "../../../components/Sidebar/EventInfo";

import Sidebar from "../../../layout/Sidebar/Sidebar.jsx";
import ListBottomButton from "../../../layout/Sidebar/SidebarFooterBtn.jsx";
import EventPickRange from "../SidebarItems/EventPickRange";
import EventRange from "../SidebarItems/EventRange";
import EventAddRange from "../SidebarItems/EventAddRange";
import ListItem from "../../../layout/Sidebar/PanelItem.jsx";

import useEventStateProps from "../../../hooks/useEventStateProps";

export default function Determined() {
  const [eventDurationState] = useEventStateProps("duration");
  const [eventNameState, setEventNameState] = useEventStateProps("name");
  const [eventPickStartState] = useEventStateProps("pickStart");
  const [eventPickEndState] = useEventStateProps("pickEnd");
  const [eventLauncherState] = useEventStateProps("launcher");
  const [eventDescriptionState] = useEventStateProps("description");

  const [eventTypeState] = useEventStateProps("eventType");
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
          label: "活動資訊 postpicking",
          content: (
            <>
              <EventName
                eventName={eventNameState}
                setEventName={setEventNameState}
              />
              <EventDuration
                eventDuration={eventDurationState}
                eventType={eventTypeState}
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
              />
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
  );
}
