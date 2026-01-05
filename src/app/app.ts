import {Component, inject} from '@angular/core';
import {TestDataService} from './core/data/test-data.service';
import {TemperatureEvaluator} from './core/status/temperature.evaluator';
import {HumidityEvaluator} from './core/status/humidity.evaluator';
import {combineLatest, map, startWith} from 'rxjs';
import {StatusCard} from './shared/ui/status-card/status-card';
import {CommonModule} from '@angular/common';
import {PressureEvaluator} from './core/status/pressure.evaluator';

@Component({
  selector: 'app-root',
  imports: [StatusCard, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  sidebarOpen = false;

  private readonly data = inject(TestDataService)

  private readonly tempEval = new TemperatureEvaluator();
  private readonly humEval = new HumidityEvaluator();
  private readonly pressureEvaluator = new PressureEvaluator();


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

  // Array van data sets
  cardsVm$ = combineLatest([
    this.temperatureVm$,
    this.humidityVm$,
    this.pressureVm$
  ]).pipe(
    map(([temp, hum, press]) => [temp, hum, press])
  );


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
