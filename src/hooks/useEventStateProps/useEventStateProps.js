import { useSelector, useDispatch } from "react-redux";

import { setEventProps } from "../../redux/features/event/eventSlice";

export default function useEventStateProps(eventProps) {
  const dispatch = useDispatch();
  const eventStateProps = useSelector(
    (store) => store.eventState.event[eventProps]
  );
  const setEventStateProps = (value) => {
    dispatch(setEventProps({ [eventProps]: value }));
  };

  return [eventStateProps, setEventStateProps];
}
