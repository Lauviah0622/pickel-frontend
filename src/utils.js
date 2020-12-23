import dayjs from "dayjs";

export const getHalfHourStart = (time) => {
  const dayjsTime = dayjs(time);
  const halfStart = dayjsTime.startOf("hour");
  return dayjsTime.get("minute") > 30
    ? halfStart.add(1, "h").toISOString()
    : halfStart.set("minute", 30).toISOString();
};

export const isValidDate = (input) => {
  return dayjs(input).isValid();
};

export const isValidDuration = (start, end, type, minDuration = 1) => {
  const durationStart = dayjs(start);
  const durationEnd = dayjs(end);
  return type === "part"
    ? dayjs(durationEnd).diff(durationStart, "minute") / 15 >= minDuration
    : dayjs(durationEnd).diff(durationStart, "day") >= minDuration;
};

const checkIsRangeNoRepeat = (ranges, addRangeStart, addRangeEnd) => {
  if (ranges.length < 1) return true;
  return !ranges
    .map((range) => {
      const startIsValid = dayjs(addRangeStart).isSameOrAfter(range.end);
      const endIsValid = dayjs(addRangeEnd).isSameOrBefore(range.start);
      return startIsValid || endIsValid;
    })
    .includes(false);
};

export const checkIsRangeValid = ({start, end}, eventType, duration, pickEnd, ranges, conclusion) => {
  const res = {};
  res.isEndLateThenStart = dayjs(end).isAfter(start);
  res.isLongerThenDuration = isValidDuration(
    start,
    end,
    eventType,
    duration
  );
  res.isLaterThanPickEnd = dayjs(start).isAfter(dayjs(pickEnd));
  if (ranges != null) {
    res.isNoRepeat = checkIsRangeNoRepeat(ranges, start, end);
  }
  return conclusion ? !Object.values(res).includes(false) : res ;
};

