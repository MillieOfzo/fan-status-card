// settings.model.ts
export interface AppSettings {
  darkMode: boolean;

  dataSource: 'live' | 'test';

  updateIntervalMs: number;

  sensorRanges: {
    temperature: { min: number; max: number };
    humidity: { min: number; max: number };
    co2: { min: number; max: number };
    pressure: { min: number; max: number };
  };

  alarms: {
    co2Max: number;
    temperatureMin: number;
    temperatureMax: number;
  };
}
