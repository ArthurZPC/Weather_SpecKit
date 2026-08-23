import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export type WeatherCondition = 'Clear/Sunny' | 'Partly Cloudy' | 'Cloudy/Overcast' | 'Fog' | 'Mist' | 'Haze' | 'Smoke' | 'Dust' | 'Sand' | 'Drizzle' | 'Rain' | 'Freezing Rain' | 'Sleet' | 'Snow' | 'Heavy Snow' | 'Hail' | 'Thunderstorm' | 'Strong Wind' | 'Squall' | 'Tornado' | 'Volcanic Ash';

export interface CurrentWeather {
  condition: WeatherCondition;
  temperature: string;
  temperatureUnit: string;
  conditionDescription: string;
  conditionVisual: string;
  available: boolean;
}

export interface LocationCity {
  cityName: string;
  cityImage: string | null;
}

export interface CurrentTimeContext {
  weekday: string;
  hour: string;
}

export interface WeatherStateVisual {
  description: string;
  visualClass: string;
}

const weatherStateVisuals: Record<WeatherCondition, WeatherStateVisual> = {
  'Clear/Sunny': { description: 'Clear skies', visualClass: 'visual-clear' },
  'Partly Cloudy': { description: 'Partly cloudy skies', visualClass: 'visual-partly-cloudy' },
  'Cloudy/Overcast': { description: 'Cloudy skies', visualClass: 'visual-cloudy' },
  Fog: { description: 'Dense fog', visualClass: 'visual-fog' },
  Mist: { description: 'Light mist', visualClass: 'visual-mist' },
  Haze: { description: 'Hazy air', visualClass: 'visual-haze' },
  Smoke: { description: 'Smoky air', visualClass: 'visual-smoke' },
  Dust: { description: 'Dust in the air', visualClass: 'visual-dust' },
  Sand: { description: 'Blowing sand', visualClass: 'visual-sand' },
  Drizzle: { description: 'Light drizzle', visualClass: 'visual-drizzle' },
  Rain: { description: 'Rain showers', visualClass: 'visual-rain' },
  'Freezing Rain': { description: 'Freezing rain', visualClass: 'visual-freezing-rain' },
  Sleet: { description: 'Sleet showers', visualClass: 'visual-sleet' },
  Snow: { description: 'Snow showers', visualClass: 'visual-snow' },
  'Heavy Snow': { description: 'Heavy snowfall', visualClass: 'visual-heavy-snow' },
  Hail: { description: 'Hail showers', visualClass: 'visual-hail' },
  Thunderstorm: { description: 'Thunderstorms', visualClass: 'visual-thunderstorm' },
  'Strong Wind': { description: 'Strong winds', visualClass: 'visual-strong-wind' },
  Squall: { description: 'Sudden squalls', visualClass: 'visual-squall' },
  Tornado: { description: 'Tornado conditions', visualClass: 'visual-tornado' },
  'Volcanic Ash': { description: 'Volcanic ash', visualClass: 'visual-volcanic-ash' }
};

@Component({
  selector: 'app-root',
  imports: [MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly title = 'Weather SpecKit';
  readonly weatherStateVisuals = weatherStateVisuals;
  readonly currentWeather: CurrentWeather = {
    condition: 'Partly Cloudy',
    temperature: '18',
    temperatureUnit: '°C',
    conditionDescription: weatherStateVisuals['Partly Cloudy'].description,
    conditionVisual: weatherStateVisuals['Partly Cloudy'].visualClass,
    available: true
  };
  readonly currentTime: CurrentTimeContext = { weekday: 'Wednesday', hour: '14:30' };
  readonly location: LocationCity = { cityName: 'Portland', cityImage: null };
  readonly unavailableMessage = 'Current weather is unavailable';
}
