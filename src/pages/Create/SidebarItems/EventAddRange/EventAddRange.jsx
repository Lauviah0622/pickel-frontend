import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addNoRepeatRange } from "../../../../redux/features/event/eventSlice";

import EventAddRange from "../../../../components/Sidebar/EventAddRange";

export default function AddRange() {
  const dispatch = useDispatch();
  const { eventType, duration, pickEnd, ranges } = useSelector(
    (store) => store.eventState.event
  );

  const handleAddRange = (start, end) => {
    dispatch(addNoRepeatRange({ start, end }));
  };

  return (
    <EventAddRange
      eventType={eventType}
      duration={duration}
      pickEnd={pickEnd}
      ranges={ranges}
      handleAddRange={handleAddRange}
    />
  );
}
