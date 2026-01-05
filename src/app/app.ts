import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AlarmTestDataService } from './core/data/alarm-test-data.service';
import { TestDataService } from './core/data/test-data.service';
import { Co2Evaluator } from './core/status/co2.evaluator';
import { HumidityEvaluator } from './core/status/humidity.evaluator';
import { PressureEvaluator } from './core/status/pressure.evaluator';
import { TemperatureEvaluator } from './core/status/temperature.evaluator';
import { StatusCard } from './shared/ui/status-card/status-card';

@Component({
  selector: 'app-root',
  imports: [StatusCard, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly data = inject(TestDataService)
  private readonly alarmService = inject(AlarmTestDataService)

  private readonly tempEval = new TemperatureEvaluator();
  private readonly humEval = new HumidityEvaluator();
  private readonly pressureEvaluator = new PressureEvaluator();
  private readonly co2Evaluator = new Co2Evaluator({
    warningMin: 1800,
    errorMin: 2800
  });

  sidebarOpen = false;

  staticCards$ = this.data.staticData$

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

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
