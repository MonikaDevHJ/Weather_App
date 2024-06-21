
/** @Format */ 

export default function ConvertKelvinToCelsius(tempInKelvin:number ):number{
   const tempInCelsius = tempInKelvin - 273.15;
   return Math.floor(tempInCelsius); //Remove decimal Part and Keeeps integer part  

} 