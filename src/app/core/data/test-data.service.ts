import { Injectable } from '@angular/core';
import { interval, map, timer } from 'rxjs';
import { StatusLevel } from '../../shared/ui/status-card/contracts/status-level.enum';
import { IStatusCard } from '../../shared/ui/status-card/contracts/status-card.interface';

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
}

export const ventilationCard: IStatusCard = {
  title: 'Ventilatie',
  value: '72',
  suffix: '%',
  status: StatusLevel.OK,
  label: 'Automatisch'
};

export const waterUsageCard: IStatusCard = {
  title: 'Waterverbruik',
  value: '1.240',
  suffix: 'L/dag',
  status: StatusLevel.OK,
  label: 'Normaal'
};
export const energyCard: IStatusCard = {
  title: 'Energie',
  value: '18.6',
  suffix: 'kWh',
  status: StatusLevel.Warning,
  label: 'Bovengemiddeld'
};
export const alarmCard: IStatusCard = {
  title: 'Alarmen',
  value: '1',
  suffix: '',
  status: StatusLevel.Warning,
  label: 'Actief'
};
export const activityCard: IStatusCard = {
  title: 'Dieractiviteit',
  value: '94',
  suffix: '%',
  status: StatusLevel.OK,
  label: 'Rustig'
};
