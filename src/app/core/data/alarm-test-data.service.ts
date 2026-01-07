import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { AlarmSeverity } from '../../shared/ui/status-card/contracts/alarm-severity.enum';
import { IAlarm } from '../../shared/ui/status-card/contracts/alarm.interface';

export const STATIC_ALARMS = {
    co2: [
        {
            id: 'a1',
            source: 'CO2',
            message: 'CO2 concentratie te hoog',
            severity: AlarmSeverity.Critical,
            timestamp: new Date(Date.now() - 1000 * 60 * 2)
        }
    ],

    temperature: [
        {
            id: 'temp-1',
            source: 'Temperatuur',
            message: 'Temperatuur te laag',
            severity: AlarmSeverity.Warning,
            timestamp: new Date(Date.now() - 1000 * 60 * 10)
        }
    ],

    humidity: [
        {
            id: 'hum-2',
            source: 'Luchtvochtigheid',
            message: 'Luchtvochtigheid te hoog',
            severity: AlarmSeverity.Warning,
            timestamp: new Date(Date.now() - 1000 * 60 * 5)
        }
    ],

    pressure: [
        {
            id: 'press-1',
            source: 'Luchtdruk',
            message: 'Luchtdruk buiten bereik',
            severity: AlarmSeverity.Warning,
            timestamp: new Date(Date.now() - 1000 * 60 * 20)
        }
    ],

    ventilation: [
        {
            id: 'a2',
            source: 'Ventilatie',
            message: 'Ventilator 2 draait niet',
            severity: AlarmSeverity.Warning,
            timestamp: new Date(Date.now() - 1000 * 60 * 10)
        }
    ],

    water: [
        {
            id: 'a3',
            source: 'Water',
            message: 'Waterverbruik lager dan verwacht',
            severity: AlarmSeverity.Warning,
            timestamp: new Date(Date.now() - 1000 * 60 * 25)
        }
    ],

    energy: [
        {
            id: 'a4',
            source: 'Energie',
            message: 'Piekverbruik gedetecteerd',
            severity: AlarmSeverity.Warning,
            timestamp: new Date(Date.now() - 1000 * 60 * 40)
        }
    ]
};

@Injectable({ providedIn: 'root' })
export class AlarmTestDataService {

    private readonly _alarms$ = new BehaviorSubject<IAlarm[]>([]);

    readonly activeAlarms$ = this._alarms$.asObservable();

    constructor() {
        // Init met statische demo-alarms
        const initialAlarms = [
            ...STATIC_ALARMS.co2,
            ...STATIC_ALARMS.temperature,
            ...STATIC_ALARMS.humidity,
            ...STATIC_ALARMS.pressure,
            ...STATIC_ALARMS.ventilation,
            ...STATIC_ALARMS.water,
            ...STATIC_ALARMS.energy
        ];
        this._alarms$.next(initialAlarms);

        // Simuleer dynamiek: random toevoegen/verwijderen van alarms
        // 5 sec
        timer(1000, 15000).subscribe(() => this.randomAlarmAdd());
        // 15 sec
        interval(10000).subscribe(() => this.randomAlarmRemove());
    }

    private randomAlarmAdd() {
        // Kans op extra demo-alarm (bijvoorbeeld 30%)
        if (Math.random() < 0.3) {
            const sources = ['CO2', 'Ventilatie', 'Water', 'Energie', 'Temperatuur', 'Luchtvochtigheid', 'Luchtdruk'];
            const source = sources[Math.floor(Math.random() * sources.length)];

            const alarm: IAlarm = {
                id: crypto.randomUUID(),
                source,
                message: `${source} demo alarm ${Math.random() > 0.7 ? AlarmSeverity.Critical : AlarmSeverity.Warning}`,
                severity: Math.random() > 0.7 ? AlarmSeverity.Critical : AlarmSeverity.Warning,
                timestamp: new Date()
            };

            this._alarms$.next([...this._alarms$.value, alarm]);
        }
    }

    private randomAlarmRemove() {
        const alarms = this._alarms$.value;
        if (!alarms.length) return;

        // Verwijder willekeurig een alarm (30% kans)
        if (Math.random() < 0.3) {
            const updated = [...alarms];
            updated.splice(0, 1);
            this._alarms$.next(updated);
        }
    }
}