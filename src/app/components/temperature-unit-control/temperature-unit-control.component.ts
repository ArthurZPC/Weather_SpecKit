import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TemperatureUnit } from '../../models/weather.models';

@Component({ selector: 'app-temperature-unit-control', imports: [MatButtonToggleModule], templateUrl: './temperature-unit-control.component.html', styleUrl: './temperature-unit-control.component.css' })
export class TemperatureUnitControlComponent {
  @Input({ required: true }) selectedUnit!: TemperatureUnit;
  @Output() selectedUnitChange = new EventEmitter<TemperatureUnit>();
  selectUnit(unit: TemperatureUnit): void { this.selectedUnitChange.emit(unit); }
}