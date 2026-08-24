import { Component } from '@angular/core';
import { CurrentWeatherComponent } from './components/current-weather-sidebar/current-weather-sidebar.component';
import { TodayHighlightsComponent } from './components/today-highlights/today-highlights.component';
import { WeeklyForecastComponent } from './components/weekly-forecast/weekly-forecast.component';
import { TemperatureUnitControlComponent } from './components/temperature-unit-control/temperature-unit-control.component';
import {
  LocationSearchResult,
  LocationCity,
  TemperatureUnit,
  WeatherRequestState,
  LiveWeatherSnapshot,
} from './models/weather.models';
import { getWeatherVisual } from './utils/weather-mapping.utils';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  imports: [
    CurrentWeatherComponent,
    TodayHighlightsComponent,
    WeeklyForecastComponent,
    TemperatureUnitControlComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly title = 'Weather SpecKit';
  currentWeather: LiveWeatherSnapshot['currentWeather'] = {
    condition: 'Unavailable',
    temperatureCelsius: 0,
    conditionDescription: getWeatherVisual('Unavailable').description,
    available: false,
  };
  currentTime: LiveWeatherSnapshot['currentTime'] = {
    weekday: 'Unavailable',
    hour: 'Unavailable',
  };
  weeklyForecast: LiveWeatherSnapshot['weeklyForecast'] = [];
  todayHighlights: LiveWeatherSnapshot['todayHighlights'] = [];
  location: LocationCity = {
    cityName: 'Minsk',
    country: 'Belarus',
    latitude: 53.9,
    longitude: 27.5667,
    cityImage: null,
  };
  searchResults: LocationSearchResult[] = [];
  searchQuery = '';
  requestState: WeatherRequestState = 'loading';
  errorMessage = '';
  noResults = false;
  selectedUnit: TemperatureUnit = 'C';

  private requestId = 0;

  constructor(private readonly weatherApi: WeatherApiService) {
    this.loadLocation(this.location);
  }

  setUnit(unit: TemperatureUnit): void {
    this.selectedUnit = unit;
  }

  updateSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  search(): void {
    const query = this.searchQuery.trim();
    if (!query) return;
    this.noResults = false;
    this.weatherApi.searchLocations(query).subscribe({
      next: (response) => {
        this.searchResults = this.weatherApi.normalizeLocations(response);
        this.noResults = this.searchResults.length === 0;
      },
      error: () => {
        this.searchResults = [];
        this.noResults = true;
      },
    });
  }

  selectLocation(selected: LocationSearchResult): void {
    this.searchResults = [];
    this.noResults = false;
    this.searchQuery = '';
    this.location = selected;
    this.loadLocation(selected);
  }

  retry(): void {
    this.loadLocation(this.location);
  }

  private loadLocation(selected: LocationCity): void {
    const requestId = ++this.requestId;
    this.requestState = 'loading';
    this.errorMessage = '';
    this.weatherApi.loadWeather(selected).subscribe({
      next: (response) => {
        if (requestId !== this.requestId) return;
        const snapshot = this.weatherApi.normalizeSnapshot(
          response.forecast,
          response.airQuality,
        );
        this.currentWeather = snapshot.currentWeather;
        this.currentTime = snapshot.currentTime;
        this.weeklyForecast = snapshot.weeklyForecast;
        this.todayHighlights = snapshot.todayHighlights;
        this.requestState = 'ready';
      },
      error: (error: Error) => {
        if (requestId !== this.requestId) return;
        this.requestState = 'error';
        this.errorMessage =
          error.message || 'Live weather is unavailable right now.';
      },
    });
  }
}
