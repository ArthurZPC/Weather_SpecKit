import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HighlightMetric } from '../../models/weather.models';

@Component({ selector: 'app-today-highlights', imports: [MatCardModule], templateUrl: './today-highlights.component.html', styleUrl: './today-highlights.component.css' })
export class TodayHighlightsComponent {
  @Input({ required: true }) highlights!: HighlightMetric[];
  handleImageError(event: Event): void { (event.target as HTMLImageElement).src = '/images/weather-states/not-available.svg'; }
}