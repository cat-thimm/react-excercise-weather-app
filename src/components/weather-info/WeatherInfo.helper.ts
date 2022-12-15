export const fetchFutureWeather = async (setErrorMessage: (message: string) => void, place: string, numberOfPlaces: string) => {
    return new Promise(async function (resolve, reject) {
        try {
            // 1 day: cnt=9, 3 days: cnt=25, 5day: no cnt
            let cnt;
            if (numberOfPlaces === 'one') {
                cnt = '9'
            } else if (numberOfPlaces === 'three') {
                cnt = '25'
            } else {
                cnt = ''
            }
            const result = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${place}&cnt=${cnt}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}&units=metric`
            );
            if (result.status === 200) {
                const data = await result.json();
                if (data.list) {
                    resolve(data.list);
                } else {
                    setErrorMessage("Error occured fetching weather data");
                    reject();
                }
            } else {
                setErrorMessage("Error occured fetching weather data");
                reject();
            }
        } catch (err) {
            setErrorMessage(err);
            throw err;
        }
    })

};

export const fetchHistoryWeather = async (setErrorMessage: (message: string) => void, place: string, ) => {
    return new Promise(async function (resolve, reject) {
        try {
            const res = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}&units=metric`
            )
            if (res.status === 200) {
                const data = await res.json()
                if (!data) {
                    reject();
                }
                const day1 = await getHistoricalWeather(1, data, setErrorMessage);
                if (!day1) {
                    reject();
                }
                const day2 = await getHistoricalWeather(2, data, setErrorMessage);
                if (!day2) {
                    reject();
                }
                const day3 = await getHistoricalWeather(3, data, setErrorMessage);
                if (!day3) {
                    reject();
                }
                const day4 = await getHistoricalWeather(4, data, setErrorMessage);
                if (!day4) {
                    reject();
                }
                const day5 = await getHistoricalWeather(5, data, setErrorMessage);
                if (!day5) {
                    reject();
                }
                resolve([...day5, ...day4, ...day3, ...day2, ...day1])
            } else {
                setErrorMessage("Error occured fetching weather data");
                reject();
            }
        } catch (error) {
            setErrorMessage("Error occured fetching location data");
        }

    }
    )
}


async function getHistoricalWeather(previousDate: number, data: any, setErrorMessage: (message: string) => void) {
    try {
        const date = Math.floor((new Date().getTime() - (24 * 60 * 60 * 1000) * previousDate) / 1000);
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${data[0].lat}&lon=${data[0].lon}&dt=${date}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}&units=metric`
        )
        if (result.status === 200) {
            const data = await result.json();
            return data.hourly
        } else {
            setErrorMessage("Error occured fetching weather data of day " + previousDate);
        }
    } catch (error) {
        console.log(error)
        setErrorMessage("Error occured fetching weather data of day " + previousDate);
    }
}


export const isFirstElement = (weatherForeCast: any, isHistory: boolean, weather: any, index: number) => {
    return (
        (!isHistory &&
            weatherForeCast[index - 1] &&
            weatherForeCast[index - 1].dt_txt.split(" ")[0] ===
            weather.dt_txt.split(" ")[0]) ||
        (isHistory &&
            weatherForeCast[index - 1] &&
            createHistoryDate(weatherForeCast[index - 1].dt) ===
            createHistoryDate(weather.dt))
    );
};

export const isLastElement = (weatherForeCast: any, isHistory: boolean, weather: any, index: number) => {
    return (
        (!isHistory &&
            weatherForeCast[index + 1] &&
            weatherForeCast[index + 1].dt_txt.split(" ")[0] ===
            weather.dt_txt.split(" ")[0]) ||
        (isHistory &&
            weatherForeCast[index + 1] &&
            createHistoryDate(weatherForeCast[index + 1].dt) ===
            createHistoryDate(weather.dt))
    );
};

export const createHistoryTime = (date: number) => {
    const formatedDate = new Date(date * 1000);
    return (
        formatedDate.getHours() +
        ":0" +
        formatedDate.getMinutes() +
        ":0" +
        formatedDate.getSeconds()
    );
};

export const createHistoryDate = (date: number) => {
    const formatedDate = new Date(date * 1000);
    return (
        formatedDate.getFullYear() +
        "-" +
        formatedDate.getMonth() +
        "-" +
        formatedDate.getDate()
    );
};

export const reformatTime = (time: string) => {
    const formatedTime = time.split(':')
    return formatedTime[0] + ':' + formatedTime[1] + ' Uhr';
}

export const reformatDate = (date: string) => {
    const formatedDate = date.split('-')
    return formatedDate[2] + '/' + formatedDate[1] + '/' + formatedDate[0];
}