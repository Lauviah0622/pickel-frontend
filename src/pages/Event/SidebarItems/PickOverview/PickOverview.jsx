import React from "react";
import styled from "styled-components";

import MuiAccordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ListItem from "../../../../components/List/ListItem.jsx";
import Period from "./Period.jsx";

const Accordion = styled(MuiAccordion)`
  &.MuiPaper-root {
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.palette.secondary.light};
    padding-bottom: 4px;
    margin-bottom: 8px;
    box-shadow: none;
    &::before {
      content: none;
    }

    &.Mui-expanded {
      margin: 0;
    }
  }

  .MuiAccordionSummary-root {
    padding: 0 8px;
    min-height: auto;

    &.Mui-expanded {
      min-height: auto;
    }
  }

  .MuiIconButton-root {
    padding: 9px;
  }
  .MuiAccordionSummary-content {
    margin: 8px 0;
  }

  .MuiAccordionSummary-content.Mui-expanded {
    margin: 8px 0;
  }

  .period__container {
    flex-direction: column;
    cursor: unset;
    > div + div {
      margin-top: 8px;
    }
  }
`;

const PickerName = styled.h4`
  font-size: 0.8em;
  color: ${(props) => props.theme.palette.text.primary};
  font-weight: 700;
`;

const AccordionContainer = styled.div`
  margin-top: 8px;
`;

/* eslint-disable-next-line */
const testData = [
  {
    id: 1,
    name: "Ted",
    periods: [
      {
        description: "nonon",
        start: "2020-12-20T15:45:00.000Z",
        duration: 6,
        priority: 3,
      },
      {
        description: "non",
        start: "2020-12-20T05:15:00.000Z",
        duration: 6,
        priority: 3,
      },
      {
        description: "non",
        start: "2020-12-20T23:45:00.000Z",
        duration: 6,
        priority: 3,
      },
    ],
  },
  {
    id: 2,
    name: "Ted",
    periods: [
      {
        description: "nonon",
        start: "2020-12-20T05:12:38.000Z",
        duration: 6,
        priority: 3,
      },
    ],
  },
  {
    id: 3,
    name: "Ted",
    periods: [
      {
        description: "nonon",
        start: "2020-12-20T23:45:00.000Z",
        duration: 6,
        priority: 3,
      },
    ],
  },
];

const Picks = testData.map((pick) => (
  <Accordion key={pick.id}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <PickerName>{pick.name}</PickerName>
    </AccordionSummary>
    <AccordionDetails className="period__container">
      {pick.periods.map((period) => (<Period
        start={period.start}
        duration={period.duration}
        type={"part"}
      />))}
    </AccordionDetails>
  </Accordion>
));

export default function PickOverview() {
  return (
    <ListItem text="可參與者">
      <AccordionContainer>{Picks}</AccordionContainer>
    </ListItem>
  );
}
