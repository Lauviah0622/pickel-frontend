import React from "react";

import useEventStateProps from "../../../../hooks/useEventStateProps";
import EventDuration from "../../../../components/Sidebar/EventDuration";


export default function SettingEventDuration() {
  const [eventDurationState, setEventDurationState] = useEventStateProps(
    "duration"
  );
  const [eventTypeState, setEventTypeState] = useEventStateProps("eventType");


  return (
    <EventDuration
      eventDuration={eventDurationState}
      eventType={eventTypeState}
      setEventDuration={setEventDurationState}
      setEventType={setEventTypeState}
    />
  );
}
