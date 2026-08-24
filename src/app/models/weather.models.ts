export type WeatherCondition =
  | 'Clear/Sunny'
  | 'Partly Cloudy'
  | 'Cloudy/Overcast'
  | 'Fog'
  | 'Mist'
  | 'Haze'
  | 'Smoke'
  | 'Dust'
  | 'Sand'
  | 'Drizzle'
  | 'Rain'
  | 'Freezing Rain'
  | 'Sleet'
  | 'Snow'
  | 'Heavy Snow'
  | 'Hail'
  | 'Thunderstorm'
  | 'Strong Wind'
  | 'Squall'
  | 'Tornado'
  | 'Volcanic Ash';

export type TemperatureUnit = 'C' | 'F';

export interface WeatherStateVisual {
  description: string;
  visualClass: string;
  iconPath: string;
}

export interface CurrentWeather {
  condition: WeatherCondition;
  temperatureCelsius: number;
  conditionDescription: string;
  available: boolean;
  iconPath?: string;
}

export interface LocationCity {
  cityName: string;
  cityImage: string | null;
}

export interface CurrentTimeContext {
  weekday: string;
  hour: string;
}

export interface WeeklyForecastEntry {
  weekdayShort: string;
  condition: WeatherCondition;
  highCelsius: number;
  lowCelsius: number;
}

export interface HighlightMetric {
  label: string;
  value: string | number;
  detail?: string;
  icon?: string;
}