import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import MuiIconButton from "@material-ui/core/IconButton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useSelector, useDispatch } from "react-redux";

import { deleteRange } from "../../../../redux/features/event/eventSlice";

import { checkIsRangeValid } from "../../../../utils";

const RangeContainer = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  padding: 4px;
  border-radius: 4px;
  display: flex;
  margin-bottom: var(--spacing);
  ${(props) => props.inValid && "background: #e6453977;"}

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

function DateTimeRange({ start, end, deleteOnClick, inValid }) {
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
    <RangeContainer inValid={inValid}>
      <div className="range__adorment">
        <IconButton size="small" onClick={deleteOnClick}>
          <ClearRoundedIcon />
        </IconButton>
      </div>
      <div className="range__date">{range}</div>
    </RangeContainer>
  );
}

const IconButton = styled(MuiIconButton)`
  position: relative;
  top: -2px;
  left: -5px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 10px;
  margin: auto;
`;

export default function EventRanges() {
  const { ranges, pickEnd, duration, eventType } = useSelector(
    (store) => store.eventState.event
  );
  const dispatch = useDispatch();
  const handleRangeDeleteOnclick = (i) => () => {
    dispatch(deleteRange(i));
  };

  const rangesValidation = []
  let rangesContent;
  if (ranges.length === 0) {
    rangesContent = <EmptyMessage>還加沒加入任何範圍</EmptyMessage>;
  } else {
    rangesContent = ranges.map((range, i) => {
      const invalid = Object.values(
        checkIsRangeValid(range, eventType, duration, pickEnd)
      ).includes(false);
      rangesValidation.push(invalid)
      return (
        <DateTimeRange
          start={range.start}
          end={range.end}
          key={i}
          deleteOnClick={handleRangeDeleteOnclick(i)}
          inValid={invalid}
        />
      );
    });
  }

  return <>{rangesContent}</>;
}
