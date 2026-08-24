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

export interface WeatherStateVisual {
  description: string;
  visualClass: string;
  iconPath: string;
}

const weatherStateVisuals: Record<WeatherCondition, WeatherStateVisual> = {
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
    available: true,
    iconPath: weatherStateVisuals['Partly Cloudy'].iconPath
  };
  readonly currentTime: CurrentTimeContext = { weekday: 'Wednesday', hour: '14:30' };
  readonly location: LocationCity = { cityName: 'Portland', cityImage: null };
  readonly unavailableMessage = 'Current weather is unavailable';

  /**
   * Resolves the appropriate icon path for the current weather.
   * Returns the unavailable fallback when weather is not available,
   * otherwise returns the icon path for the selected condition.
   */
  get resolvedIconPath(): string {
    if (!this.currentWeather.available) {
      return '/images/weather-states/not-available.svg';
    }
    return this.currentWeather.iconPath || '/images/weather-states/not-available.svg';
  }

  /**
   * Handles icon load errors by swapping to the unavailable fallback.
   */
  handleIconError(): void {
    const img = document.querySelector('img.weather-visual') as HTMLImageElement;
    if (img && img.src !== '/images/weather-states/not-available.svg') {
      img.src = '/images/weather-states/not-available.svg';
    }
  }

  /**
   * Handles detail icon load errors by swapping to the unavailable fallback.
   */
  handleDetailIconError(): void {
    const img = document.querySelector('img.condition-icon') as HTMLImageElement;
    if (img && img.src !== '/images/weather-states/not-available.svg') {
      img.src = '/images/weather-states/not-available.svg';
    }
  }
}
