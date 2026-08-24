import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { weatherStateVisuals } from '../../data/weather-data';
import { formatTemperature } from '../../models/temperature.utils';
import {
  TemperatureUnit,
  WeeklyForecastEntry,
} from '../../models/weather.models';

@Component({
  selector: 'app-weekly-forecast',
  imports: [MatCardModule],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.css',
})
export class WeeklyForecastComponent {
  @Input({ required: true }) forecast!: WeeklyForecastEntry[];
  @Input({ required: true }) unit!: TemperatureUnit;
  readonly weatherStateVisuals = weatherStateVisuals;
  readonly formatTemperature = formatTemperature;
  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      '/images/weather-states/not-available.svg';
  }
}
