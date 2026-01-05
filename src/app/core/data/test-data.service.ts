import { Injectable } from '@angular/core';
import { delay, map, of, timer } from 'rxjs';
import { IStatusCard } from '../../shared/ui/status-card/contracts/status-card.interface';
import { StatusLevel } from '../../shared/ui/status-card/contracts/status-level.enum';
import { STATIC_ALARMS } from './alarm-test-data.service';

export const STATIC_DASHBOARD_CARDS: IStatusCard[] = [
  {
    title: 'Ventilatie',
    value: '42',
    suffix: '%',
    status: StatusLevel.Error,
    label: 'Beperkt',
    alarms: STATIC_ALARMS.ventilation,
    // history: [65, 60, 55, 48, 42]
  },

  {
    title: 'Waterverbruik',
    value: '820',
    suffix: 'L/dag',
    status: StatusLevel.Warning,
    label: 'Afwijkend',
    alarms: STATIC_ALARMS.water,
    // history: [1200, 1150, 1100, 950, 820]
  },

  {
    title: 'Energie',
    value: '24.8',
    suffix: 'kWh',
    status: StatusLevel.Warning,
    label: 'Piek',
    alarms: STATIC_ALARMS.energy,
  },

  {
    title: 'Dieractiviteit',
    value: '71',
    suffix: '%',
    status: StatusLevel.OK,
    label: 'Normaal',
  }
];

@Injectable({ providedIn: 'root' })
export class TestDataService {
  temperature$ = timer(1000, 10000).pipe(
    map(() => -10 + Math.random() * 50)
  );

  humidity$ = timer(1000, 8000).pipe(
    map(() => Math.random() * 100)
  );

  pressure$ = timer(1000, 5000).pipe(
    map(() => 940 + Math.random() * 150)
  );

  co2$ = timer(1200, 4500).pipe(
    map(() => 1500 + Math.random() * (3500 - 1500))
  );

  staticData$ = of(STATIC_DASHBOARD_CARDS).pipe(
    delay(1200)
  );
}
