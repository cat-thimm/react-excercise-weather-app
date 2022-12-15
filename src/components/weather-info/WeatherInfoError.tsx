const WeatherInfoError = (props: { error: string; place: string }) => {
  return (
    <div className="weather-info-error column">
      <div className="weather-info-error__header">
        Impossible to get Forecast for {props.place}
      </div>
      <div className="weather-info-error__message">{props.error}</div>
    </div>
  );
};

export default WeatherInfoError;
