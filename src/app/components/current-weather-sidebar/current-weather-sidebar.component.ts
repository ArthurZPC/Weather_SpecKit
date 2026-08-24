import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { weatherStateVisuals } from '../../data/weather-data';
import { formatTemperature } from '../../models/temperature.utils';
import { CurrentTimeContext, CurrentWeather, LocationCity, TemperatureUnit } from '../../models/weather.models';

@Component({ selector: 'app-current-weather-sidebar', imports: [MatCardModule, MatFormFieldModule, MatInputModule], templateUrl: './current-weather-sidebar.component.html', styleUrl: './current-weather-sidebar.component.css' })
export class CurrentWeatherComponent {
  @Input({ required: true }) currentWeather!: CurrentWeather;
  @Input({ required: true }) currentTime!: CurrentTimeContext;
  @Input({ required: true }) location!: LocationCity;
  @Input({ required: true }) unit!: TemperatureUnit;
  readonly unavailableMessage = 'Current weather is unavailable';
  get resolvedIconPath(): string { return this.currentWeather.available && this.currentWeather.iconPath ? this.currentWeather.iconPath : '/images/weather-states/not-available.svg'; }
  get temperature(): string { return formatTemperature(this.currentWeather.temperatureCelsius, this.unit); }
  get conditionVisual() { return weatherStateVisuals[this.currentWeather.condition]; }
  handleImageError(event: Event): void { (event.target as HTMLImageElement).src = '/images/weather-states/not-available.svg'; }
}