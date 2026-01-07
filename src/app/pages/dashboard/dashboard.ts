import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { StatusCard } from '../../shared/ui/status-card/status-card';
import { combineLatest, map, Observable, switchMap, timer } from 'rxjs';
import { AlarmTestDataService } from '../../core/data/alarm-test-data.service';
import { TestDataService } from '../../core/data/test-data.service';
import { Co2Evaluator } from '../../core/status/co2.evaluator';
import { HumidityEvaluator } from '../../core/status/humidity.evaluator';
import { PressureEvaluator } from '../../core/status/pressure.evaluator';
import { TemperatureEvaluator } from '../../core/status/temperature.evaluator';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../settings/settings.service';
import { DynamicEvaluator } from '../../core/status/dynamic.evaluator';
import { toObservable } from '@angular/core/rxjs-interop';
import { FeedDay, FeedIntake, FeedIntakeConfig } from '../../shared/ui/feed-intake/feed-intake';

@Component({
  selector: 'app-dashboard',
  imports: [StatusCard, FeedIntake, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  private readonly data = inject(TestDataService)
  private readonly alarmService = inject(AlarmTestDataService)
  private readonly settings = inject(SettingsService)

  private readonly tempEval = new TemperatureEvaluator();
  private readonly humEval = new HumidityEvaluator();
  private readonly pressureEvaluator = new PressureEvaluator();
  private readonly co2Evaluator = new Co2Evaluator({
    warningMin: 1800,
    errorMin: 2800
  });

  foodConfig: FeedIntakeConfig = {
    title: 'Voedselinname per dag (L)',
    suffix: 'g',
    feedData: [
      { day: 'Ma', value: 3600 },
      { day: 'Di', value: 3450 },
      { day: 'Wo', value: 3200 },
      { day: 'Do', value: 3180 },
      { day: 'Vr', value: 2810 },
      { day: 'Za', value: 2600 },
      { day: 'Zo', value: 2420 },
    ],
    warningMin: 2800,
    errorMin: 2500,
  };

  waterConfig: FeedIntakeConfig = {
    title: 'Water Intake per dag (g)',
    suffix: 'L',
    feedData: [
      { day: 'Ma', value: 12 },
      { day: 'Di', value: 10.5 },
      { day: 'Wo', value: 9.8 },
      { day: 'Do', value: 11 },
      { day: 'Vr', value: 8.7 },
      { day: 'Za', value: 7.5 },
      { day: 'Zo', value: 6.9 },
    ],
    warningMin: 9,
    errorMin: 7,
  };

  temperatureVm$ = combineLatest([
    this.data.temperature$,
    this.alarmService.activeAlarms$
  ]).pipe(
    map(([value, alarms]) => {
      const result = this.tempEval.evaluate(value);

      return {
        title: 'Temperatuur',
        value: value.toFixed(1),
        suffix: '°C',
        ...result,
        alarms: alarms.filter(a => a.source === 'Temperatuur')
      };
    })
  );

  humidityVm$ = combineLatest([
    this.data.humidity$,
    this.alarmService.activeAlarms$
  ]).pipe(
    map(([value, alarms]) => {
      const result = this.humEval.evaluate(value);

      return {
        title: 'Luchtvochtigheid',
        value: value.toFixed(0),
        suffix: '%',
        ...result,
        alarms: alarms.filter(a => a.source === 'Luchtvochtigheid')
      };
    })
  );

  pressureVm$ = combineLatest([
    this.data.pressure$,
    this.alarmService.activeAlarms$
  ]).pipe(
    map(([value, alarms]) => {
      const result = this.pressureEvaluator.evaluate(value);

      return {
        title: 'Luchtdruk',
        value: value.toFixed(0),
        suffix: 'hPa',
        ...result,
        alarms: alarms.filter(a => a.source === 'Luchtvochtigheid')
      };
    })
  );

  co2Vm$ = combineLatest([
    this.data.co2$,
    this.alarmService.activeAlarms$
  ]).pipe(
    map(([value, alarms]) => {
      console.log(alarms)
      const result = this.co2Evaluator.evaluate(value);

      return {
        title: 'CO₂',
        value: value.toFixed(0),
        prefix: 'ppm',
        ...result,
        alarms: alarms.filter(a => a.source === 'CO2')
      };
    })
  );

  // Dynamische statuscards
  cardsVm$ = toObservable(this.settings.statusCardConfigs).pipe(
    map(configs => configs.map(config => {
      const evaluator = new DynamicEvaluator(config);
      const obs$ = (this.data as any)[config.source] as Observable<number>;
      return combineLatest([obs$, this.alarmService.activeAlarms$]).pipe(
        map(([value, alarms]) => ({
          title: config.title,
          value: value.toFixed(0),
          suffix: config.suffix,
          ...evaluator.evaluate(value),
          alarms: alarms.filter(a => a.source === config.title)
        }))
      );
    })),
    switchMap(cardObservables => combineLatest(cardObservables))
  );
}
