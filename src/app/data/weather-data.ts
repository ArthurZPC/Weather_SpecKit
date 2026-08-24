import {
  CurrentTimeContext,
  CurrentWeather,
  HighlightMetric,
  LocationCity,
  WeatherCondition,
  WeatherStateVisual,
  WeeklyForecastEntry
} from '../models/weather.models';

export const weatherStateVisuals: Record<WeatherCondition, WeatherStateVisual> = {
  Unavailable: { description: 'Weather unavailable', visualClass: 'visual-unavailable', iconPath: '/images/weather-states/not-available.svg' },
  'Clear/Sunny': { description: 'Clear skies', visualClass: 'visual-clear', iconPath: '/images/weather-states/clear-day.svg' },
  'Partly Cloudy': { description: 'Partly cloudy skies', visualClass: 'visual-partly-cloudy', iconPath: '/images/weather-states/partly-cloudy-day.svg' },
  'Cloudy/Overcast': { description: 'Cloudy skies', visualClass: 'visual-cloudy', iconPath: '/images/weather-states/overcast-day.svg' },
  Fog: { description: 'Dense fog', visualClass: 'visual-fog', iconPath: '/images/weather-states/fog-day.svg' },
  Mist: { description: 'Light mist', visualClass: 'visual-mist', iconPath: '/images/weather-states/mist.svg' },
  Haze: { description: 'Hazy air', visualClass: 'visual-haze', iconPath: '/images/weather-states/haze-day.svg' },
  Smoke: { description: 'Smoky air', visualClass: 'visual-smoke', iconPath: '/images/weather-states/smoke.svg' },
  Dust: { description: 'Dust in the air', visualClass: 'visual-dust', iconPath: '/images/weather-states/dust.svg' },
  Sand: { description: 'Blowing sand', visualClass: 'visual-sand', iconPath: '/images/weather-states/dust-wind.svg' },
  Drizzle: { description: 'Light drizzle', visualClass: 'visual-drizzle', iconPath: '/images/weather-states/drizzle.svg' },
  Rain: { description: 'Rain showers', visualClass: 'visual-rain', iconPath: '/images/weather-states/rain.svg' },
  'Freezing Rain': { description: 'Freezing rain', visualClass: 'visual-freezing-rain', iconPath: '/images/weather-states/rain.svg' },
  Sleet: { description: 'Sleet showers', visualClass: 'visual-sleet', iconPath: '/images/weather-states/sleet.svg' },
  Snow: { description: 'Snow showers', visualClass: 'visual-snow', iconPath: '/images/weather-states/snow.svg' },
  'Heavy Snow': { description: 'Heavy snowfall', visualClass: 'visual-heavy-snow', iconPath: '/images/weather-states/snow.svg' },
  Hail: { description: 'Hail showers', visualClass: 'visual-hail', iconPath: '/images/weather-states/hail.svg' },
  Thunderstorm: { description: 'Thunderstorms', visualClass: 'visual-thunderstorm', iconPath: '/images/weather-states/thunderstorms-day.svg' },
  'Strong Wind': { description: 'Strong winds', visualClass: 'visual-strong-wind', iconPath: '/images/weather-states/wind.svg' },
  Squall: { description: 'Sudden squalls', visualClass: 'visual-squall', iconPath: '/images/weather-states/wind.svg' },
  Tornado: { description: 'Tornado conditions', visualClass: 'visual-tornado', iconPath: '/images/weather-states/tornado.svg' },
  'Volcanic Ash': { description: 'Volcanic ash', visualClass: 'visual-volcanic-ash', iconPath: '/images/weather-states/dust.svg' }
};

export const currentWeather: CurrentWeather = {
  condition: 'Partly Cloudy',
  temperatureCelsius: 18,
  conditionDescription: weatherStateVisuals['Partly Cloudy'].description,
  available: true,
  iconPath: weatherStateVisuals['Partly Cloudy'].iconPath
};

export const currentTime: CurrentTimeContext = { weekday: 'Wednesday', hour: '14:30' };
export const location: LocationCity = { cityName: 'Portland', cityImage: null };

export const weeklyForecast: WeeklyForecastEntry[] = [
  { weekdayShort: 'Sun', condition: 'Clear/Sunny', highCelsius: 21, lowCelsius: 13 },
  { weekdayShort: 'Mon', condition: 'Partly Cloudy', highCelsius: 20, lowCelsius: 12 },
  { weekdayShort: 'Tue', condition: 'Cloudy/Overcast', highCelsius: 17, lowCelsius: 11 },
  { weekdayShort: 'Wed', condition: 'Rain', highCelsius: 16, lowCelsius: 10 },
  { weekdayShort: 'Thu', condition: 'Clear/Sunny', highCelsius: 19, lowCelsius: 9 },
  { weekdayShort: 'Fri', condition: 'Partly Cloudy', highCelsius: 22, lowCelsius: 12 },
  { weekdayShort: 'Sat', condition: 'Clear/Sunny', highCelsius: 24, lowCelsius: 14 }
];

export const todayHighlights: HighlightMetric[] = [
  { label: 'UV Index', value: 5, detail: 'Moderate', icon: '/images/weather-states/uv-index-5.svg' },
  { label: 'Wind Status', value: '7 km/h', detail: 'W  ·  Gentle breeze', icon: '/images/weather-states/wind.svg' },
  { label: 'Sunrise & Sunset', value: '06:12 / 20:48', detail: '14h 36m of daylight', icon: '/images/weather-states/sunrise.svg' },
  { label: 'Humidity', value: '64%', detail: 'Comfortable', icon: '/images/weather-states/humidity.svg' },
  { label: 'Visibility', value: '10 km', detail: 'Clear horizon', icon: '/images/weather-states/horizon.svg' },
  { label: 'Air Quality', value: '42', detail: 'Good', icon: '/images/weather-states/barometer.svg' }
];