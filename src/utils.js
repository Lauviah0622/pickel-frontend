import dayjs from "dayjs";

const UNSAVE_LOCAL = "unsaveEvent";



const setEventLocalStorage = (event) =>
  localStorage.setItem(UNSAVE_LOCAL, JSON.stringify(event));

const getEventLocalStorage = () => {
  const localJSON = JSON.parse(localStorage.getItem(UNSAVE_LOCAL));
  if (!localJSON) return null
  console.log('localJson', localJSON);
  localJSON.pickStart = Date(localJSON.pickStart)
  localJSON.pickEnd = Date(localJSON.pickEnd)
  return localJSON
}

const cleanEventLocalStorage = () => {
  localStorage.removeItem(UNSAVE_LOCAL);
};

const getHalfHourStart = (time) => {
  const dayjsTime = dayjs(time);
  const halfStart = dayjsTime.startOf("hour");

  console.log('getHalfHourStart', halfStart.toDate());
  return dayjsTime.get("minute") > 30
    ? halfStart.add(1, 'h').toDate()
    : halfStart.set("minute", 30).toDate();
};

export {
  setEventLocalStorage,
  getEventLocalStorage,
  cleanEventLocalStorage,
  getHalfHourStart,
};
