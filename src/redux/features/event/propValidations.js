import dayjs from "dayjs";

const propValidations = {
    name: [
      {
        validation: (value) => value.length > 0,
        message: "no event name",
      },
    ],
    launcher: [
      { validation: (value) => value.length > 0, message: "no launcher name" },
    ],
    description: [],
    duration: [
      {
        validation: (value) => typeof value === "number" || value > 0,
        message: "invalid duration",
      },
    ],
    eventType: [
      {
        validation: (value) => ["part", "allday"].includes(value),
        message: "invalid eventType value",
      },
    ],
    pickStart: [
      {
        validation: (value) =>
          typeof value === "string" || dayjs(value).isValid(),
        message: "invalid time format",
      },
    ],
    pickEnd: [
      {
        validation: (value) =>
          typeof value === "string" || dayjs(value).isValid(),
        message: "invalid time format",
      },
    ],
    ranges: [
      {
        validation: (value) => {
          return value.length > 0;
        },
        message: "no ranges",
      },
    ],
  };
  

  export default propValidations;