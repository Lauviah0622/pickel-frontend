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

/**
 * 
 * @param {*} ranges 
 * @param {*} addRangeStart 
 * @param {*} addRangeEnd 
 * @param {*} innerCheck 內部檢查，ranges 裡面包含被檢查的時間
 */
const checkIsRangeNoRepeat = (ranges, addRangeStart, addRangeEnd, innerCheck = false) => {
  if (ranges.length < 1) return true;
  const SAME_RANGE = 'same';
  const result = ranges
    .map((range) => {
      if (dayjs(range.start).isSame(dayjs(addRangeStart)) && dayjs(range.end).isSame(dayjs(addRangeEnd))) {
        return SAME_RANGE
      }
      const startIsValid = dayjs(addRangeStart).isSameOrAfter(range.end);
      const endIsValid = dayjs(addRangeEnd).isSameOrBefore(range.start);
      return startIsValid || endIsValid;
    });
  
  if (innerCheck) {
    const i = result.indexOf(SAME_RANGE)
    const hasOneSameRange = i === result.lastIndexOf(SAME_RANGE) && i >= 0;
    return !result.includes(false) && hasOneSameRange
  }
  return !result.includes(false)
  
};

/**
 * 
 * @param {Object{rangeStart, rangeEnd}}
 * @param {*} eventType 
 * @param {*} duration 
 * @param {*} pickEnd 
 * @param {Range} ranges 
 * @param {boolean} innerCheck 給 checkIsRangeNoRepeat 的參數
 * @param {boolean} conclusion 表示說，要這個時段的總結果，還是這個時段有哪些問題
 */

export const checkIsRangeValid = (
  { start, end },
  eventType,
  duration,
  pickEnd,
  ranges,
  innerCheck,
  conclusion
) => {
  const res = {};
  
  res.isEndLateThenStart = dayjs(end).isAfter(start);
  res.isLongerThenDuration = isValidDuration(start, end, eventType, duration);
  res.isLaterThanPickEnd = dayjs(start).isAfter(dayjs(pickEnd));
  if (ranges) {
    const isNoRepeat = checkIsRangeNoRepeat(ranges, start, end, innerCheck);
    res.isNoRepeat = isNoRepeat
  }
  return conclusion ? !Object.values(res).includes(false) : res;
};



export const getEventState = (event) => {
  switch (true) {
    case event.determineTime != null:
      return "determined";
    case dayjs().isAfter(dayjs(event.pickEnd)):
      return "postPicking";
    case dayjs(event.pickEnd).isAfter(dayjs()) &&
      dayjs().isAfter(dayjs(event.pickStart)):
      return "picking";
    case dayjs(event.pickStart).isAfter(dayjs()):
      return "prePicking";
    case event.pickSuffix == null && event.eventSuffix == null:
      return "draft";
    default:
      return "invalid";
  }
};

export const getFormatedRange = (start, end) => {
  const rangeStart = dayjs(start);
  const rangeEnd = dayjs(end);
  if (rangeStart.isSame(rangeEnd, "day")) {
    return {
      date: rangeStart.locale("zh-tw").format("dddd, MM 月 DD 日"),
      time: [
        rangeStart.locale("zh-tw").format("h:mm"),
        rangeEnd.locale("zh-tw").format("h:mm"),
      ],
    };
  }
  const formatDateTime = (dayObj) => ({
    date: dayObj.locale("zh-tw").format("dddd, MM 月 DD 日"),
    time: dayObj.locale("zh-tw").format("h:mm"),
  });

  const formatedStart = formatDateTime(rangeStart);
  const formatedEnd = formatDateTime(rangeEnd);

  return [formatedStart, formatedEnd];
};
