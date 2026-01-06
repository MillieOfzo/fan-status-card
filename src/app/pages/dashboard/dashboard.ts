import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  imports: [StatusCard, CommonModule],
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
