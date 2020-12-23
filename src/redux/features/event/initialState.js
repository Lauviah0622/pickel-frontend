import dayjs from "dayjs";
import { getHalfHourStart } from "../../../utils";

const initialEventState = {
  name: "酉社讀書會",
  launcher: "酉西",
  description: "",
  duration: 1,
  eventType: "part",
  pickStart: getHalfHourStart(dayjs()),
  pickEnd: getHalfHourStart(dayjs().add(1, "d")),
  ranges: [],
};

const initialPropsValidationState = Object.keys(initialEventState).reduce(
  (prevObj, key) => {
    const obj = { ...prevObj };
    obj[key] = [];
    return obj;
  },
  {}
);

export { initialEventState, initialPropsValidationState };
