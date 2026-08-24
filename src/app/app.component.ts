import { Component } from '@angular/core';
import { CurrentWeatherComponent } from './components/current-weather-sidebar/current-weather-sidebar.component';
import { TodayHighlightsComponent } from './components/today-highlights/today-highlights.component';
import { WeeklyForecastComponent } from './components/weekly-forecast/weekly-forecast.component';
import { TemperatureUnitControlComponent } from './components/temperature-unit-control/temperature-unit-control.component';
import { currentTime, currentWeather, location, todayHighlights, weeklyForecast } from './data/weather-data';
import { TemperatureUnit } from './models/weather.models';

@Component({
  selector: 'app-root',
  imports: [CurrentWeatherComponent, TodayHighlightsComponent, WeeklyForecastComponent, TemperatureUnitControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly title = 'Weather SpecKit';
  readonly currentWeather = currentWeather;
  readonly currentTime = currentTime;
  readonly location = location;
  readonly weeklyForecast = weeklyForecast;
  readonly todayHighlights = todayHighlights;
  selectedUnit: TemperatureUnit = 'C';

  setUnit(unit: TemperatureUnit): void {
    this.selectedUnit = unit;
  }
}
