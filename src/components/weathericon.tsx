
  // import { Props } from 'next/script'
  // import React from 'react'
  // import Image from 'next/image'
  // import {Cn} from "@/utils/cn"

  // type Props = {

  // }

  // export default function WeatherIcon(props: React.HTMLProps <HTMLDivElement> & {iconName:string}) {
  //   return (
  //     <div {...props} className={Cn('relative h-20 w-20')}>
  //       <Image 
  //       width={100}
  //       height={100}
  //       className='absolute h-full w-full'
  //       alt='Weather-icon'
  //       src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}/> 
  //     </div>
  //   );
  // }

  import React from 'react';
import Image from 'next/image';

interface WeatherIconProps {
  iconName: string;
  timestamp: string; // Add timestamp prop here
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconName, timestamp }) => {
  return (
    <div className="relative h-20 w-20">
      <Image 
        width={100}
        height={100}
        className="absolute h-full w-full"
        alt="Weather-icon"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
      {/* <p className="absolute bottom-0 right-0 text-xs  text-gray-500">{timestamp}</p> */}
    </div>
  );
};

export default WeatherIcon;

