import React, {useState} from "react";
import styled from "styled-components";
import MuiInput from "@material-ui/core/Input";
import MuiButton from "@material-ui/core/Button";

const Root = styled.div`
  background-color: #d6e2c9;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.palette.primary.dark};
  font-size: 4em;
  font-weight: 500;
`;

const Subtitle = styled.h2`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 1.5em;
  font-weight: 300;
`;

const Input = styled(MuiInput)`
  margin: 40px 0;
  .MuiInput-input {
    font-size: 5em;
    text-align: center;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled(MuiButton)`
    font-size: 1.2em;
`;

export default function Entry() {
    const [eventName, setEventName] = useState('');
    const handleInputSChange = (e) => {
        setEventName(e.target.value);
    }
    
    
  return (
    <Root>
      <Title>Pickel</Title>
      <Subtitle>Host your event simple</Subtitle>
      <StyledForm>
        <Input
          id="standard-basic"
          label="Standard"
          placeholder="你的活動名稱？"
          autoFocus={true}
          autoComplete={"off"}
          value={eventName}
          onChange={handleInputSChange}
        />
        <Button color="primary" variant="contained" component="div" size="large">
          {eventName.length ? `然後點我輸入 ${eventName} 的活動資訊` : '先上在上面輸入名稱'}
        </Button>
      </StyledForm>
    </Root>
  );
}
