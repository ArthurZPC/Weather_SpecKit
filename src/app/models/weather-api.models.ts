export interface ForecastResponse {
  current?: { time?: string; weather_code?: number; temperature_2m?: number; wind_speed_10m?: number; wind_direction_10m?: number; relative_humidity_2m?: number };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    uv_index_max?: number[];
    visibility_mean?: number[];
    daylight_duration?: number[];
    sunrise?: string[];
    sunset?: string[];
  };
}

export interface GeocodingResult { id?: number; name?: string; country?: string; admin1?: string; latitude?: number; longitude?: number; timezone?: string; }
export interface GeocodingResponse { results?: GeocodingResult[]; }
export interface AirQualityResponse { current?: { european_aqi?: number }; }