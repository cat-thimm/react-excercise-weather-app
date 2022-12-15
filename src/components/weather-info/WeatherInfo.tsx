import { useState, useEffect } from "react";
import { useParams } from "react-router";

import {
  fetchHistoryWeather,
  fetchFutureWeather,
  isFirstElement,
  isLastElement,
  createHistoryTime,
  createHistoryDate,
  reformatDate,
  reformatTime,
} from "./WeatherInfo.helper";
import WeatherInfoError from "./WeatherInfoError";

const WeatherInfo = (props: { isHistory: boolean; numberOfPlaces: string }) => {
  let { place } = useParams<{ place: string }>();

  const isObject = (object: unknown): object is { [key: string]: any } =>
    typeof object === "object" && object !== null;

  const [weatherForeCast, setWeatherForeCast] = useState<any>(
    isObject(sessionStorage.getItem("weather" + place))
      ? JSON.parse(sessionStorage.getItem("weather" + place)!)
      : []
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getWeatherInfo = async () => {
      try {
        let weatherData;
        if (props.isHistory) {
          weatherData = await fetchHistoryWeather(
            setErrorMessage,
            place,
          );
        }
        if (!props.isHistory) {
          weatherData = await fetchFutureWeather(
            setErrorMessage,
            place,
            props.numberOfPlaces
          );
        }

        if (!weatherData) {
          setErrorMessage(
            "Unfortunately, we couldn't find any information for that place"
          );
          return;
        }
        sessionStorage.setItem("weather" + place, JSON.stringify(weatherData));
        setWeatherForeCast(weatherData);
      } catch (err) {
        setErrorMessage(err);
        throw err;
      }
    };
    getWeatherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place, props.numberOfPlaces]);

  if (!weatherForeCast) return null;
  return (
    <div className="column">
      {errorMessage !== "" ? (
        <WeatherInfoError place={place} error={errorMessage} />
      ) : (
        <div>
          {weatherForeCast.map((weather: any, index: number) => {
            return (
              <div className="column" key={index}>
                {isFirstElement(
                  weatherForeCast,
                  props.isHistory,
                  weather,
                  index
                ) ? null : (
                  <div className="weather-info__col-date">
                    {props.isHistory
                      ? reformatDate(createHistoryDate(weather.dt))
                      : reformatDate(weather.dt_txt.split(" ")[0])}
                  </div>
                )}

                <div
                  className="weather-info column"
                  style={{
                    marginTop: isFirstElement(
                      weatherForeCast,
                      props.isHistory,
                      weather,
                      index
                    )
                      ? "0px"
                      : "25px",
                    borderTopLeftRadius: isFirstElement(
                      weatherForeCast,
                      props.isHistory,
                      weather,
                      index
                    )
                      ? "0px"
                      : "20px",
                    borderTopRightRadius: isFirstElement(
                      weatherForeCast,
                      props.isHistory,
                      weather,
                      index
                    )
                      ? "0px"
                      : "20px",
                    borderBottomLeftRadius: isLastElement(
                      weatherForeCast,
                      props.isHistory,
                      weather,
                      index
                    )
                      ? "0px"
                      : "20px",
                    borderBottomRightRadius: isLastElement(
                      weatherForeCast,
                      props.isHistory,
                      weather,
                      index
                    )
                      ? "0px"
                      : "20px",
                  }}
                >
                  <div className="row">
                    <img
                      className="weather-info__icon"
                      src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt=""
                    />
                    <div className="weather-info__date">
                      {props.isHistory
                        ? reformatTime(createHistoryTime(weather.dt))
                        : reformatTime(weather.dt_txt.split(" ")[1])}
                    </div>
                  </div>
                  <div className="weather-info__temp">
                    {props.isHistory
                      ? ""
                      : "Min: " +
                        weather.main.temp_min.toString() +
                        "° / Max: " +
                        weather.main.temp_max.toString() +
                        "°"}
                  </div>
                  <div className="weather-info__description">
                    {"We expect " + weather.weather[0].description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
