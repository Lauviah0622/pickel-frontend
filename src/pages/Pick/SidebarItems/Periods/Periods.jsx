import React from "react";
import styled from "styled-components";
import MuiIconButton from "@material-ui/core/IconButton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import Range from "../../../../components/list/Range.jsx";

const IconButton = styled(MuiIconButton)`
  position: relative;
  top: -2px;
  left: -5px;
`;


export default function Periods({ periods }) {
  return (
    <>
      {periods.map((period) => (
        <Range
          start={period.start}
          end={period.end}
          adornment={
            <IconButton size="small">
              <ClearRoundedIcon />
            </IconButton>
          }
        />
      ))}
    </>
  );
}
