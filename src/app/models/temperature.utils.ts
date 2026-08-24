import { TemperatureUnit } from './weather.models';

export function convertCelsius(celsius: number, unit: TemperatureUnit): number {
  return unit === 'F' ? celsius * 9 / 5 + 32 : celsius;
}

export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  return `${Math.round(convertCelsius(celsius, unit))}°`;
}