import Container from "./container";
import React from "react";
import WeatherIcon from "./weathericon";
import WeatherDeatils, { WeatherdeatilsProps } from "./weatherdeatils";
import ConvertKelvinToCelsius from "@/utils/convertkelvintoclecius";

export interface forecastWeatherDetailsProps extends WeatherdeatilsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;  
}

export default function ForecastWeather(props: forecastWeatherDetailsProps) {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description
  } = props;
  return (
    <Container className="gap-4">
        {/* Left Section */}
      <section className="flex gap-4 items-center px-4">
        {/* First Column */}
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatherIcon} timestamp={""} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        {/* Second column */}
        <div className="flex flex-col px-4">
          <span className="text-5xl ">{ConvertKelvinToCelsius(temp ?? 0)}</span>
          <p className="text-sm space-x-1 whitespace-nowrap">
            <span>Feels Like</span>
            <span>{ConvertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>

          <p className="capitalize">{description}</p>
        </div>
      </section>

      {/*Right Section  */}

      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
      <WeatherDeatils {...props} />
      </section>
    </Container>
  );
}
