import styled from "styled-components";

import MuiButton from "@material-ui/core/Button";

const Button = styled(MuiButton)`
flex-grow: 0;
flex-shrink: 0;
${(props) =>
  props.alert &&
  `
    background-color: ${props.theme.palette.error.main};
    color: ${props.theme.palette.error.contrastText};
    &:hover {
      background-color: ${props.theme.palette.error.dark};
    }
`}
${(props) =>
  props.main &&
  `
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    padding: 8px 22px;
    font-size: 0.9375rem;
    }
`}
`;

export default Button