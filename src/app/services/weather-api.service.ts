import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { AirQualityResponse, ForecastResponse, GeocodingResponse } from '../models/weather-api.models';
import { LocationSearchResult, LocationCity, LiveWeatherSnapshot } from '../models/weather.models';
import { getSundayToSaturdayRange, isIsoDate } from '../utils/forecast-date.utils';
import { aqiDescription, aqiIcon, beaufortDescription, compassDirection, formatDaylight, formatLocalTime, formatNumber, formatVisibility, getWeatherVisual, mapWeatherCode, uvDescription, uvIcon, visibilityDescription } from '../utils/weather-mapping.utils';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  private readonly forecastEndpoint = 'https://api.open-meteo.com/v1/forecast';
  private readonly geocodingEndpoint = 'https://geocoding-api.open-meteo.com/v1/search';
  private readonly airQualityEndpoint = 'https://air-quality-api.open-meteo.com/v1/air-quality';

  constructor(private readonly http: HttpClient) {}

  searchLocations(query: string): Observable<GeocodingResponse> {
    const params = new HttpParams().set('name', query.trim()).set('count', 10).set('language', 'en').set('format', 'json');
    return this.http.get<GeocodingResponse>(this.geocodingEndpoint, { params });
  }

  loadWeather(location: LocationCity): Observable<{ forecast: ForecastResponse; airQuality: AirQualityResponse }> {
    const range = getSundayToSaturdayRange();
    const params = new HttpParams()
      .set('latitude', location.latitude ?? 0).set('longitude', location.longitude ?? 0)
      .set('current', 'weather_code,temperature_2m,wind_speed_10m,wind_direction_10m,relative_humidity_2m')
      .set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,visibility_mean,daylight_duration,sunrise,sunset')
      .set('timezone', 'auto').set('start_date', range.startDate).set('end_date', range.endDate);
    const airParams = new HttpParams().set('latitude', location.latitude ?? 0).set('longitude', location.longitude ?? 0).set('current', 'european_aqi').set('timezone', 'auto');
    return forkJoin({ forecast: this.http.get<ForecastResponse>(this.forecastEndpoint, { params }), airQuality: this.http.get<AirQualityResponse>(this.airQualityEndpoint, { params: airParams }) });
  }

  normalizeLocations(response: GeocodingResponse): LocationSearchResult[] {
    return (response.results ?? []).filter((result) => this.isFiniteCoordinate(result.latitude) && this.isFiniteCoordinate(result.longitude) && !!result.name && !!result.country).map((result, index) => {
      const latitude = result.latitude as number;
      const longitude = result.longitude as number;
      return { id: result.id ?? index, cityName: result.name as string, country: result.country as string, admin1: result.admin1 ?? null, latitude, longitude, timezone: result.timezone ?? null, cityImage: null, displayLabel: `${result.name} / Lat: ${latitude} Lon: ${longitude}` };
    });
  }

  normalizeSnapshot(forecast: ForecastResponse, airQuality: AirQualityResponse): LiveWeatherSnapshot {
    const current = forecast.current;
    const daily = forecast.daily;
    if (!current || !daily || !current.time || !this.isNumber(current.weather_code) || !this.isNumber(current.temperature_2m) || !this.isNumber(current.wind_speed_10m) || !this.isNumber(current.wind_direction_10m) || !this.isNumber(current.relative_humidity_2m) || !daily.time || daily.time.length < 7) throw new Error('The weather response is incomplete.');
    const arrays = [daily.weather_code, daily.temperature_2m_max, daily.temperature_2m_min, daily.uv_index_max, daily.visibility_mean, daily.daylight_duration, daily.sunrise, daily.sunset];
    if (arrays.some((values) => !values || values.length < 7)) throw new Error('The forecast response has incomplete daily data.');
    if (daily.time.slice(0, 7).some((date) => !isIsoDate(date)) || daily.weather_code!.slice(0, 7).some((value) => !this.isNumber(value)) || daily.temperature_2m_max!.slice(0, 7).some((value) => !this.isNumber(value)) || daily.temperature_2m_min!.slice(0, 7).some((value) => !this.isNumber(value)) || daily.uv_index_max!.slice(0, 7).some((value) => !this.isNumber(value)) || daily.visibility_mean!.slice(0, 7).some((value) => !this.isNumber(value)) || daily.daylight_duration!.slice(0, 7).some((value) => !this.isNumber(value))) throw new Error('The forecast response contains invalid daily values.');
    const weatherCondition = mapWeatherCode(current.weather_code as number);
    const currentVisual = getWeatherVisual(weatherCondition);
    const nullable = (value: number | undefined): number | null => this.isNumber(value) ? value : null;
    const forecastEntries = daily.time.slice(0, 7).map((date, index) => { const condition = mapWeatherCode(daily.weather_code![index]); return { date, weekdayShort: new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' }), condition, highCelsius: daily.temperature_2m_max![index], lowCelsius: daily.temperature_2m_min![index] }; });
    const uv = nullable(daily.uv_index_max![this.todayIndex(daily.time)]);
    const visibility = nullable(daily.visibility_mean![this.todayIndex(daily.time)]);
    const daylight = nullable(daily.daylight_duration![this.todayIndex(daily.time)]);
    const sunrise = daily.sunrise![this.todayIndex(daily.time)] ?? null;
    const sunset = daily.sunset![this.todayIndex(daily.time)] ?? null;
    const wind = nullable(current.wind_speed_10m);
    const direction = nullable(current.wind_direction_10m);
    const humidity = nullable(current.relative_humidity_2m);
    const aqi = nullable(airQuality.current?.european_aqi);
    return { currentWeather: { condition: weatherCondition, temperatureCelsius: current.temperature_2m as number, conditionDescription: currentVisual.description, available: true, iconPath: currentVisual.iconPath }, currentTime: { weekday: new Date(current.time).toLocaleDateString('en-US', { weekday: 'long' }), hour: formatLocalTime(current.time) }, weeklyForecast: forecastEntries, todayHighlights: [
      { label: 'UV Index', value: formatNumber(uv), detail: uvDescription(uv), icon: uvIcon(uv) },
      { label: 'Wind Status', value: wind === null ? 'Unavailable' : `${Math.round(wind)} km/h`, detail: `${compassDirection(direction)}  ·  ${beaufortDescription(wind)}`, icon: '/images/weather-states/wind.svg' },
      { label: 'Sunrise & Sunset', value: `${formatLocalTime(sunrise)} / ${formatLocalTime(sunset)}`, detail: formatDaylight(daylight), icon: '/images/weather-states/sunrise.svg' },
      { label: 'Humidity', value: formatNumber(humidity, '%'), detail: 'Relative humidity', icon: '/images/weather-states/humidity.svg' },
      { label: 'Visibility', value: formatVisibility(visibility), detail: visibilityDescription(visibility), icon: '/images/weather-states/horizon.svg' },
      { label: 'Air Quality (European AQI)', value: formatNumber(aqi), detail: aqiDescription(aqi), icon: aqiIcon(aqi) }
    ] };
  }

  private isNumber(value: unknown): value is number { return typeof value === 'number' && Number.isFinite(value); }
  private isFiniteCoordinate(value: unknown): value is number { return this.isNumber(value); }
  private todayIndex(dates: string[]): number { const today = new Date().toISOString().slice(0, 10); return Math.max(0, Math.min(6, dates.indexOf(today))); }
}