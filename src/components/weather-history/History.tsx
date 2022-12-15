import { useParams } from "react-router";
import WeatherInfo from "../weather-info/WeatherInfo";


const History = () => {
  let { place } = useParams<{ place: string }>();
  return (
    <>
      <div className="column">
        <h2 className="history__header">History</h2>
        <div className="history__description">
          This is the weather of the last 5 days in {place}
        </div>
        <WeatherInfo isHistory={true} numberOfPlaces=""/>
      </div>
    </>
  );
};

export default History;
