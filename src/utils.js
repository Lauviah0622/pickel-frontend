import dayjs from "dayjs";

const UNSAVE_LOCAL = "unsaveEvent";


const setEventLocalStorage = (event) => {
  localStorage.setItem(UNSAVE_LOCAL, JSON.stringify(event));
};

const getEventLocalStorage = () => {
  const localJSON = JSON.parse(localStorage.getItem(UNSAVE_LOCAL));
  if (!localJSON) return null;
  return localJSON;
};

const cleanEventLocalStorage = () => {
  localStorage.removeItem(UNSAVE_LOCAL);
};

const getHalfHourStart = (time) => {
  const dayjsTime = dayjs(time);
  const halfStart = dayjsTime.startOf("hour");
  return dayjsTime.get("minute") > 30
    ? halfStart.add(1, "h").toISOString()
    : halfStart.set("minute", 30).toISOString();
};

const isValidDate = (input) => {
  return dayjs(input).isValid()
}

const isValidDuration = (start, end, type, minDuration = 1) => {
  const durationStart = dayjs(start);
  const durationEnd = dayjs(end);
  return type === 'part' 
  ? dayjs(durationEnd).diff(durationStart, 'minute') / 15 >= minDuration
  : dayjs(durationEnd).diff(durationStart, 'day') >= minDuration
  };

export {
  setEventLocalStorage,
  getEventLocalStorage,
  cleanEventLocalStorage,
  getHalfHourStart,
  isValidDate,
  isValidDuration
};
