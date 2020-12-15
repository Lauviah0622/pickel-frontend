import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

const PeriodContainer = styled.div`
width: 100%;

.datetime__container {
  display: flex;
  justify-content: space-between;
  width: inherit;
}
.datetime__time {
  width: 10ch;
}
`;


export default function Period({ start, duration, type }) {
  const periodStart = dayjs(start);
  const periodEnd =
    type === "part"
      ? dayjs(start).add(duration * 15, "minute")
      : dayjs(start).add(duration, "day");

  let period;
  if (periodStart.get("date") !== periodEnd.get("date")) {
    const formatDateTime = (dayObj) => [
      dayObj.locale("zh-tw").format("dddd, MM 月 DD 日"),
      dayObj.locale("zh-tw").format("h:mm"),
    ];
    const formatedStart = formatDateTime(periodStart);
    const formatedEnd = formatDateTime(periodEnd);
    period = (
      <>
        <div className="datetime__container">
          <div>{formatedStart[0]}</div>
          <div className="datetime__time">{formatedStart[1]}～</div>
        </div>
        <div className="datetime__container">
          <div>{formatedEnd[0]}</div>
          <div className="datetime__time">{formatedEnd[1]}</div>
        </div>
      </>
    );
  } else {
    period = (
      <>
        <div className="datetime__container">
          <div>{periodStart.locale("zh-tw").format("dddd, MM 月 DD 日")}</div>
          <div className="datetime__time">
            {periodStart.locale("zh-tw").format("h:mm")}～
            {periodEnd.locale("zh-tw").format("h:mm")}
          </div>
        </div>
      </>
    );
  }
  return <PeriodContainer>{period}</PeriodContainer>;
}
