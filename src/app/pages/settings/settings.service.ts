// settings.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from './settings.model';
const STORAGE_KEY = 'app_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
    darkMode: false,
    dataSource: 'test',
    updateIntervalMs: 2000,

    sensorRanges: {
        temperature: { min: -10, max: 40 },
        humidity: { min: 0, max: 100 },
        co2: { min: 1500, max: 3500 },
        pressure: { min: 940, max: 1100 }
    },

    alarms: {
        co2Max: 2000,
        temperatureMin: -5,
        temperatureMax: 35
    }
};

@Injectable({ providedIn: 'root' })
export class SettingsService {

    private settings$ = new BehaviorSubject<AppSettings>(
        this.loadSettings()
    );

    settingsChanges$ = this.settings$.asObservable();

    get value() {
        return this.settings$.value;
    }

    update(settings: AppSettings) {
        this.settings$.next(settings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }

    private loadSettings(): AppSettings {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    }
}
