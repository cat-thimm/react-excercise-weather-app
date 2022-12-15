import WeatherInfo from "../weather-info/WeatherInfo";
import styled from "styled-components";
import { useParams } from "react-router";
import { useState } from "react";

const Select = styled.select`
  margin: 10px;
  margin-left: 20px;
  font-family: "Poppins";
  font-size: 18px;
  color: white;
  width: 50px;
  border: 1px solid rgba(255, 255, 255, 1);
  background-color: rgba(21, 32, 43, 1);
  border: 0px;
  cursor: pointer;
  border-radius: 10px;
`;

const Header = styled.h2`
  font-size: 24px;
  margin-top: 20px;
  margin-left: 150px;
`;

const Row = styled.div`
  margin: 20px;
  margin-left: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;


const WeatherForecast = () => {
  let { place } = useParams<{ place: string }>();
  const [numberOfPlaces, setNumberOfPlaces] = useState("five");

  return (
    <div>
      <Header>Weather Forecast for {place}</Header>
      <Row>
        <div>How many days would you like to see?</div>
        <Select
          name="Days"
          value={numberOfPlaces}
          onChange={(e) => setNumberOfPlaces(e.target.value)}
        >
          <option value="one">1</option>
          <option value="three">3</option>
          <option value="five">5</option>
        </Select>
      </Row>
      <WeatherInfo isHistory={false} numberOfPlaces={numberOfPlaces} />
    </div>
  );
};

export default WeatherForecast;
