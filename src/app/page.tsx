// home.tsx
'use client'

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO, isValid } from "date-fns";
import ConvertKelvinToCelsius from "@/utils/convertkelvintoclecius"; // Adjust the path as per your file structure
import Navbar from "@/components/navbar"; // Adjust the path as per your file structure
import Container from "@/components/container"; // Adjust the path as per your file structure
import WeatherIcon from "@/components/weathericon"; // Adjust the path as per your file structure
import WeatherDeatils from "@/components/weatherdeatils"; // Adjust the path as per your file structure
import { metersToKilometers } from "@/utils/metersTokilometrs"; // Adjust the path as per your file structure
import { ConvertWindSpeed } from "@/utils/convertWindspeed"; // Adjust the path as per your file structure
import ForecastWeather from "@/components/forecastWeather"; // Adjust the path as per your file structure
import { useAtom } from "jotai";
import { PlaceAtom } from "./atom"; // Adjust the path as per your file structure

const safeFormat = (dateString: string, formatString: string) => {
  if (!dateString) return "";
  const parsedDate = parseISO(dateString);
  return isValid(parsedDate) ? format(parsedDate, formatString) : "";
};

const Home: React.FC = () => {
  const [place, setPlace] = useAtom(PlaceAtom);

  const fetchWeatherData = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
    );
    return data;
  };

  const { isLoading, error, data } = useQuery(
    ["weatherData", place],
    fetchWeatherData,
    {
      enabled: !!place, // Only fetch if place is set
    }
  );

  const uniqueDates = [
    ...new Set(
      data?.list.map((entry: { dt: number }) =>
        new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry: { dt: number }) => {
      const entryDate = new Date(entry.dt * 1000)
        .toISOString()
        .split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p>Error fetching data...</p>
      </div>
    );
  }

  const firstData = data?.list[0];
  if (!firstData) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p>No weather data available.</p>
      </div>
    );
  }

  const currentDate = firstData.dt_txt ?? "";

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar place={place} setPlace={setPlace} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4 mt-3">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{safeFormat(currentDate, "EEEE")}</p>
              <p className="text-lg">{safeFormat(currentDate, "dd.MM.yyyy")}</p>
            </h2>
            <Container className="gap-10 px-6 items-center mt-3">
              <div className="flex flex-col px-4">
                <span className="text-2xl">
                  {ConvertKelvinToCelsius(firstData.main.temp ?? 296.37)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels Like</span>
                  <span>
                    {ConvertKelvinToCelsius(firstData.main.feels_like ?? 20)}
                  </span>
                </p>
                <p className="text-sm space-x-2">
                  <span>
                    {ConvertKelvinToCelsius(firstData.main.temp_max ?? 20)}↑°
                  </span>
                  <span>
                    {ConvertKelvinToCelsius(firstData.main.temp_min ?? 0)}↓°
                  </span>
                </p>
              </div>

              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data.list.map(
                  (
                    item: { dt_txt: string; weather: { icon: string }[]; main: { temp: any } },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                    >
                      <p className="whitespace-nowrap">
                        {safeFormat(item.dt_txt, "h:mm a")}
                      </p>
                      <WeatherIcon
                        iconName={item.weather[0].icon}
                        timestamp={item.dt_txt}
                      />
                      <p>{ConvertKelvinToCelsius(item.main.temp ?? 0)} °C</p>
                    </div>
                  )
                )}
              </div>
            </Container>
          </div>

          <div className="flex gap-4">
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={firstData.weather[0].icon}
                timestamp={firstData.dt_txt}
              />
            </Container>

            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDeatils
                visability={metersToKilometers(firstData?.visibility ?? 10000)}
                humidity={`${firstData?.main.humidity}`}
                windSpeed={ConvertWindSpeed(firstData?.wind.speed ?? 1.64)}
                airPressure={`${firstData?.main.pressure} hPa`}
                sunrise={safeFormat(
                  fromUnixTime(data?.city.sunrise ?? 17029452).toISOString(),
                  "H:mm"
                )}
                sunset={safeFormat(
                  fromUnixTime(data?.city.sunset ?? 17029452).toISOString(),
                  "H:mm"
                )}
              />
            </Container>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast (7 days)</p>

          {firstDataForEachDate.map((d, i) => (
            <ForecastWeather
              key={i}
              description={d?.weather[0].description ?? ""}
              weatherIcon={d?.weather[0].icon ?? "old"}
              date={safeFormat(d?.dt_txt, "dd.MM")}
              day={safeFormat(d?.dt_txt, "EEEE")}
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp ?? 0}
              temp_min={d?.main.temp ?? 0}
              airPressure={`${d?.main.pressure}hPa`}
              humidity={`${d?.main.humidity}%`}
              sunrise={safeFormat(
                fromUnixTime(data?.city.sunrise ?? 17025117656).toISOString(),
                "H:mm"
              )}
              sunset={safeFormat(
                fromUnixTime(data?.city.sunset ?? 17025117656).toISOString(),
                "H:mm"
              )}
              visability={`${metersToKilometers(d?.visibility ?? 10000)}`}
              windSpeed={`${ConvertWindSpeed(d?.wind.speed ?? 1.64)}`}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
