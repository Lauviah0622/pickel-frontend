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


export default initialEventState ;
