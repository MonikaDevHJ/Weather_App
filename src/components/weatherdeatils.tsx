/**@format */

import React from "react";
import { FiDroplet } from "react-icons/fi";
import { LuEye ,LuSunrise, LuSunset } from "react-icons/lu";
import {MdAir} from "react-icons/md";
import {ImMeter} from "react-icons/im";

export interface WeatherdeatilsProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDeatils(props: WeatherdeatilsProps) {
  const {
    visability="25km",
    humidity= "61%",
    windSpeed="7 km/h",
    airPressure= "1012 hpa",
    sunrise= "6.20",
    sunset= "18.48"
  } = props;
  
  return (
    <>
      <SingleWeatherDetails
        icon={<LuEye />}
        information="Visability"
        Value={visability}
      />

      <SingleWeatherDetails
        icon={<FiDroplet />}
        information="humidity"
        Value={humidity}
      />

      <SingleWeatherDetails
        icon={<MdAir />}
        information="windSpeed"
        Value={windSpeed}
      />

      <SingleWeatherDetails
        icon={<ImMeter/>}
        information="airPressure"
        Value={airPressure}
      />

      <SingleWeatherDetails
        icon={<LuSunrise />}
        information="sunrise"
        Value={sunrise}
      />
       <SingleWeatherDetails
        icon={<LuSunset />}
        information="sunset"
        Value={sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailsProps {
  information: string;
  icon: React.ReactNode;
  Value: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
  return (
    <div className="flex flex-col justify-between gap-2 intems-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap ">{props.information}</p>
      <p className="text-3xl ">{props.icon}</p>
      <p>{props.Value}</p>
    </div>
  );
}
