import React from "react";

import EventInfo from "../../../../components/Sidebar/EventInfo";

import useEventStateProps from "../../../../hooks/useEventStateProps";

export default function SettingEventInfo() {
  const [eventLauncherState, setEventLauncherState] = useEventStateProps(
    "launcher"
  );
  const [eventDescriptionState, setEventDescriptionState] = useEventStateProps(
    "description"
  );

  return (
    <EventInfo
      eventLauncher={eventLauncherState}
      eventDescription={eventDescriptionState}
      setEventLauncher={setEventLauncherState}
      setEventDescription={setEventDescriptionState}
    />
  );
}
