/**@format */

export function metersToKilometers(visabilityInMeters:number):string{
    const visibilityInKilometers = visabilityInMeters /1000;
    return `${visibilityInKilometers.toFixed(0)}km` //Round To 0 To decimal places and add "km" Unit
}