import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import MuiIconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import TextField from "@material-ui/core/TextField";

import Sidebar from "../../components/Sidebar";
import ListBottomButton from "../../components/List/ListBottomButton.jsx";
import DefaultListItem from "../../components/List/ListItem.jsx";
import Range from "../../components/List/Range.jsx";
import Periods from "./SidebarItems/Periods";

import DateTimePicker from "../../components/List/DateTimePicker.jsx";

const Container = styled.div``;

const SidebarBottomItems = (
  <>
    <ListBottomButton variant="contained" alertTheme={true}>
      Primary
    </ListBottomButton>
    <ListBottomButton variant="contained" color="primary" mainTheme={true}>
      Primary
    </ListBottomButton>
  </>
);

const testData = {
  event: {
    id: 4,
    pickStart: "2020-12-12T15:12:38.000Z",
    pickEnd: "2020-12-14T15:12:38.000Z",
    name: "determined",
    description:
      "picking time: start before 3 day, expired yesterday\n      duration: 1.5hr\n      Range: after 5 ~ 7 days 13:00 ~ 18:00\n      picks: 4\n      ",
    duration: 6,
    launcher: "Tom",
    eventType: "part",
    eventSuffix: "determined",
    pickSuffix: "determined",
    determineTime: "2020-12-20T06:12:38.000Z",
    ranges: [
      {
        start: "2020-12-20T05:12:38.000Z",
        end: "2020-12-20T10:12:38.000Z",
      },
      {
        start: "2020-12-21T05:12:38.000Z",
        end: "2020-12-21T10:12:38.000Z",
      },
      {
        start: "2020-12-22T15:12:38.000Z",
        end: "2020-12-22T18:12:38.000Z",
      },
    ],
  },
};

const ListItem = styled(DefaultListItem)`
  > div + div {
    padding: 6px 0 7px 7px;
  }
`;

const testPeriod = [
  {
    description: "nonon",
    start: "2020-12-20T15:45:00.000Z",
    duration: 6,
    priority: 2,
  },
  {
    description: "non",
    start: "2020-12-20T05:15:00.000Z",
    duration: 6,
    priority: 1,
  },
  {
    description: "non",
    start: "2020-12-20T23:45:00.000Z",
    duration: 6,
    priority: 3,
  },
];

const AddPeriod = styled.div`
  display: flex;
`;

const IconButton = styled(MuiIconButton)`
  position: relative;
  /* top: -2px;*/
  left: -1px;
`;

export default function Pick() {
  const [periods, setPeriods] = useState(testPeriod);

  const Pannels = {
    活動資訊: (
      <>
        <ListItem text="活動主辦">{testData.event.launcher}</ListItem>
        <ListItem text="活動時長">{testData.event.duration}</ListItem>
        <ListItem text="投票期限">
          {dayjs(testData.event.pickStart).format("MM/DD dddd, hh:mm")} ~{" "}
          {dayjs(testData.event.pickEnd).format("MM/DD dddd, hh:mm")}
        </ListItem>
        <ListItem text="可參與時間範圍">
          {testData.event.ranges.map((range) => (
            <Range start={range.start} end={range.end} />
          ))}
        </ListItem>
        <ListItem text="活動附註">{testData.event.description}</ListItem>
      </>
    ),
    投票資訊: (
      <>
        <ListItem text="參加者">
          <TextField
            defaultValue="Hello World"
          />
        </ListItem>
        <ListItem text="可參與時間">
          <Periods periods={periods} setPeriods={setPeriods} />
          <AddPeriod>
            <div className="range__adorment">
              <IconButton size="small">
                <AddRoundedIcon />
              </IconButton>
            </div>
            <div className="range__date">
              <DateTimePicker />
              <DateTimePicker />
            </div>
          </AddPeriod>
        </ListItem>
      </>
    ),
  };

  return (
    <Container>
      <Sidebar SidebarBottomItems={SidebarBottomItems}>{Pannels}</Sidebar>
    </Container>
  );
}
