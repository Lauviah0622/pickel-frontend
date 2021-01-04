import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteRange } from "../../../../redux/features/event/eventSlice";
import EventRange from "../../../../components/Sidebar/EventRange";

export default function EventRanges() {
  const { ranges, pickEnd, duration, eventType } = useSelector(
    (store) => store.eventState.event
  );
  const dispatch = useDispatch();
  const handleDeleteRange = (i) => {
    dispatch(deleteRange(i));
  };

  return (
    <EventRange
      ranges={ranges}
      deleteRange={handleDeleteRange}
      pickEnd={pickEnd}
      eventType={eventType}
      duration={duration}
    />
  );
}
