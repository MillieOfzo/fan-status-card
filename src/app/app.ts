import { Component, inject } from '@angular/core';
import { activityCard, alarmCard, energyCard, TestDataService, ventilationCard, waterUsageCard } from './core/data/test-data.service';
import { TemperatureEvaluator } from './core/status/temperature.evaluator';
import { HumidityEvaluator } from './core/status/humidity.evaluator';
import { combineLatest, map, startWith } from 'rxjs';
import { StatusCard } from './shared/ui/status-card/status-card';
import { CommonModule } from '@angular/common';
import { PressureEvaluator } from './core/status/pressure.evaluator';
import { Co2Evaluator } from './core/status/co2.evaluator';

@Component({
  selector: 'app-root',
  imports: [StatusCard, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  private readonly data = inject(TestDataService)

  private readonly tempEval = new TemperatureEvaluator();
  private readonly humEval = new HumidityEvaluator();
  private readonly pressureEvaluator = new PressureEvaluator();
  private readonly co2Evaluator = new Co2Evaluator();


  sidebarOpen = false;

  staticCards = [
    ventilationCard,
    waterUsageCard,
    energyCard,
    alarmCard,
    activityCard
  ];


  temperatureVm$ = this.data.temperature$.pipe(
    map(value => {
      const result = this.tempEval.evaluate(value);
      return {
        title: 'Temperatuur',
        value: value.toFixed(1),
        suffix: '°C',
        ...result
      };
    }),
    startWith(null)
  );

  humidityVm$ = this.data.humidity$.pipe(
    map(value => {
      const result = this.humEval.evaluate(value);
      return {
        title: 'Luchtvochtigheid',
        value: value.toFixed(0),
        suffix: '%',
        ...result
      };
    }),
    startWith(null)
  );

  pressureVm$ = this.data.pressure$.pipe(
    map(value => {
      const result = this.pressureEvaluator.evaluate(value);
      return {
        title: 'Luchtdruk',
        value: value.toFixed(0),
        suffix: 'hPa',
        ...result
      };
    }),
    startWith(null)
  );

  co2Vm$ = this.data.co2$.pipe(
    map(value => {
      const result = this.co2Evaluator.evaluate(value);
      return {
        title: 'CO₂',
        value: value.toFixed(0),
        suffix: 'ppm',
        ...result
      };
    }),
    startWith(null)
  );


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
