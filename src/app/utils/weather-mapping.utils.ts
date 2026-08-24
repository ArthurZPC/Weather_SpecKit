import { WeatherCondition, WeatherStateVisual } from '../models/weather.models';
import { weatherStateVisuals } from '../data/weather-data';

const weatherCodeMap: Array<[number[], WeatherCondition]> = [
  [[0], 'Clear/Sunny'],
  [[1, 2], 'Partly Cloudy'],
  [[3], 'Cloudy/Overcast'],
  [[45, 48], 'Fog'],
  [[51, 53, 55, 56, 57], 'Drizzle'],
  [[61, 63, 65, 66, 67], 'Rain'],
  [[71, 73], 'Snow'],
  [[75, 77], 'Heavy Snow'],
  [[80, 81, 82], 'Rain'],
  [[85, 86], 'Snow'],
  [[95, 96, 99], 'Thunderstorm'],
];

export function mapWeatherCode(code: number): WeatherCondition {
  return (
    weatherCodeMap.find(([codes]) => codes.includes(code))?.[1] ?? 'Unavailable'
  );
}
export function getWeatherVisual(
  condition: WeatherCondition,
): WeatherStateVisual {
  return weatherStateVisuals[condition] ?? weatherStateVisuals.Unavailable;
}

export function uvDescription(value: number | null): string {
  if (value === null) return 'Unavailable';
  if (value <= 2) return 'Low';
  if (value <= 5) return 'Moderate';
  if (value <= 7) return 'High';
  if (value <= 10) return 'Very High';
  return 'Extreme';
}
export function uvIcon(value: number | null): string {
  return value === null
    ? '/images/weather-states/not-available.svg'
    : `/images/weather-states/uv-index-${Math.max(1, Math.min(11, Math.round(value)))}.svg`;
}

export function compassDirection(degrees: number | null): string {
  if (degrees === null) return 'Unavailable';
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return directions[Math.round((((degrees % 360) + 360) % 360) / 22.5) % 16];
}
export function beaufortDescription(speed: number | null): string {
  if (speed === null) return 'Unavailable';
  if (speed < 1) return 'Calm';
  if (speed < 6) return 'Light breeze';
  if (speed < 12) return 'Gentle breeze';
  if (speed < 20) return 'Moderate breeze';
  if (speed < 29) return 'Fresh breeze';
  if (speed < 39) return 'Strong breeze';
  if (speed < 50) return 'Near gale';
  if (speed < 62) return 'Gale';
  if (speed < 75) return 'Strong gale';
  if (speed < 89) return 'Storm';
  if (speed < 103) return 'Violent storm';
  return 'Hurricane force';
}

export function visibilityDescription(meters: number | null): string {
  if (meters === null) return 'Unavailable';
  if (meters < 200) return 'Very poor';
  if (meters < 500) return 'Poor';
  if (meters < 1000) return 'Moderate';
  if (meters < 4000) return 'Good';
  if (meters <= 10000) return 'Very good';
  return 'Excellent';
}
export function formatVisibility(meters: number | null): string {
  return meters === null ? 'Unavailable' : `${Math.round(meters / 1000)} km`;
}
export function formatLocalTime(value: string | null): string {
  if (!value) return 'Unavailable';
  const match = value.match(/T(\d{2}:\d{2})/);
  return match?.[1] ?? 'Unavailable';
}
export function formatDaylight(seconds: number | null): string {
  if (seconds === null) return 'Unavailable';
  return `${Math.floor(seconds / 3600)}h ${Math.round((seconds % 3600) / 60)}m of daylight`;
}
export function formatNumber(value: number | null, suffix = ''): string {
  return value === null || !Number.isFinite(value)
    ? 'Unavailable'
    : `${Math.round(value)}${suffix}`;
}
export function aqiDescription(value: number | null): string {
  if (value === null) return 'Unavailable';
  if (value <= 20) return 'Good';
  if (value <= 40) return 'Fair';
  if (value <= 60) return 'Moderate';
  if (value <= 80) return 'Poor';
  if (value <= 100) return 'Very Poor';
  return 'Extremely Poor';
}
export function aqiIcon(value: number | null): string {
  return value === null
    ? '/images/weather-states/not-available.svg'
    : '/images/weather-states/barometer.svg';
}
