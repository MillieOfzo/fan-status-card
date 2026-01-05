import { Injectable } from '@angular/core';
import { interval, map, timer } from 'rxjs';

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
