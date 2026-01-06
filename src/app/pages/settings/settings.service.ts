// settings.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppSettings } from './settings.model';
import { IDynamicEvaluatorConfig } from '../../core/status/dynamic.evaluator';
const APP_SETTINGS_KEY = 'app_settings_v1';
const STATUS_CARDS_KEY = 'status_cards_v1';

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
        localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
    }

    private loadSettings(): AppSettings {
        const saved = localStorage.getItem(APP_SETTINGS_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    }



    private _statusCardConfigs = signal<IDynamicEvaluatorConfig[]>(this.loadFromStorage());

    get statusCardConfigs() { return this._statusCardConfigs.asReadonly(); }

    private saveToStorage(configs: IDynamicEvaluatorConfig[]) {
        localStorage.setItem(STATUS_CARDS_KEY, JSON.stringify(configs));
    }

    private loadFromStorage(): IDynamicEvaluatorConfig[] {
        const stored = localStorage.getItem(STATUS_CARDS_KEY);
        if (stored) {
            try {
                return JSON.parse(stored) as IDynamicEvaluatorConfig[];
            } catch {
                return []; // fallback
            }
        }
        // fallback default
        return [
            { type: 'temperature', title: 'Temperatuur', source: 'temperature$', suffix: '°C', warningMin: 30, errorMin: 40 },
            { type: 'co2', title: 'CO₂', source: 'co2$', suffix: 'ppm', warningMin: 1800, errorMin: 2800 }
        ];
    }

    addCard(config: IDynamicEvaluatorConfig) {
        this._statusCardConfigs.update(list => {
            const updated = [...list, config];
            this.saveToStorage(updated);
            return updated;
        });
    }

    updateCards(configs: IDynamicEvaluatorConfig[]) {
        this._statusCardConfigs.set(configs);
        this.saveToStorage(configs);
    }

    removeCard(index: number) {
        this._statusCardConfigs.update(list => {
            const updated = list.filter((_, i) => i !== index);
            this.saveToStorage(updated);
            return updated;
        });
    }
}
