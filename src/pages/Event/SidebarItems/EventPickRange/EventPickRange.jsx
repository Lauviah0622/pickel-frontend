import React from "react";
import { useSelector } from "react-redux";

import useEventStateProps from "../../../../hooks/useEventStateProps";
import EventPickRange from "../../../../components/Sidebar/EventPickRange";


export default function SetEventpickRange() {
  const [eventPickStartState] = useEventStateProps(
    "pickStart"
  );
  const [eventPickEndState] = useEventStateProps(
    "pickEnd"
  );

  const {
    duration: eventDurationState,
    eventType: eventTypeState,
  } = useSelector((store) => store.eventState.event);

  return (
    <EventPickRange
      eventType={eventTypeState}
      eventDuration={eventDurationState}
      eventPickStart={eventPickStartState}
      eventPickEnd={eventPickEndState}
      // setEventPickStart={setEventPickStartState}
      // setEventPickEnd={setEventPickEndState}
    />
  );
}
