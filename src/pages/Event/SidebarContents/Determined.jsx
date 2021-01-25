import React from "react";

import Sidebar from "../../../layout/Sidebar/Sidebar.jsx";
import ListBottomButton from "../../../layout/Sidebar/SidebarFooterBtn.jsx";
import ListItem from "../../../layout/Sidebar/PanelItem.jsx";

import EventDuration from "../../../components/Sidebar/EventDuration";
import EventName from "../../../components/Sidebar/EventName";
import EventInfo from "../../../components/Sidebar/EventInfo";
import EventPickRange from "../../../components/Sidebar/EventPickRange";
import EventRange from "../../../components/Sidebar/EventRange";

import useEventStateProps from "../../../hooks/useEventStateProps";

export default function Determined() {
  const [eventDurationState] = useEventStateProps("duration");
  const [eventNameState] = useEventStateProps("name");
  const [eventPickStartState] = useEventStateProps("pickStart");
  const [eventPickEndState] = useEventStateProps("pickEnd");
  const [eventLauncherState] = useEventStateProps("launcher");
  const [eventDescriptionState] = useEventStateProps("description");
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
              <EventName eventName={eventNameState} />
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
                <EventRange
                  eventRanges={eventRanges}
                  eventPickEnd={eventPickEndState}
                  eventType={eventTypeState}
                  eventDuration={eventDurationState}
                />
              </ListItem>
            </>
          ),
        },
      ]}
    </Sidebar>
  );
}
