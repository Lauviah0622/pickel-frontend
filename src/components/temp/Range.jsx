import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

const RangeContainer = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  padding: 4px;
  border-radius: 4px;
  display: flex;
  .range__date {
    flex-grow: 1;
  }

  .datetime__container {
    display: flex;
    justify-content: space-between;
    width: inherit;

    & + .datetime__container {
      margin-top: 4px;
    }
  }
  .datetime__time {
    width: 10ch;
  }
`;

export default function Range({ start, end, adornment }) {
  const rangeStart = dayjs(start);
  const rangeEnd = dayjs(end);

  let range;
  if (rangeStart.isSame(rangeEnd, "day")) {
    range = (
      <div>
        <div className="datetime__container">
          <div>{rangeStart.locale("zh-tw").format("dddd, MM 月 DD 日")}</div>
          <div className="datetime__time">
            {rangeStart.locale("zh-tw").format("h:mm")}～
            {rangeEnd.locale("zh-tw").format("h:mm")}
          </div>
        </div>
      </div>
    );
  } else {
    const formatDateTime = (dayObj) => [
      dayObj.locale("zh-tw").format("dddd, MM 月 DD 日"),
      dayObj.locale("zh-tw").format("h:mm"),
    ];
    const formatedStart = formatDateTime(rangeStart);
    const formatedEnd = formatDateTime(rangeEnd);
    range = (
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
  }
  return (
    <RangeContainer>
      <div className="range__adorment">{adornment}</div>
      <div className="range__date">{range}</div>
    </RangeContainer>
  );
}
