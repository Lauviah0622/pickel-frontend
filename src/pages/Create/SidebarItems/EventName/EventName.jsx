import React from "react";

import EventName from '../../../../components/Sidebar/EventName';

import useEventStateProps from '../../../../hooks/useEventStateProps';

export default function SettingEventName() {
  const [eventNameState, setEventNameState] = useEventStateProps('name')

  return (
    <EventName eventName={eventNameState}
      setEventName={setEventNameState}
    />
  );
}
