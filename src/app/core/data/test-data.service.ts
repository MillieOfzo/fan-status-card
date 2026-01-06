import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';


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

  ventilation$ = timer(1500, 7000).pipe(map(() => 30 + Math.random() * 40));
  energy$ = timer(2000, 6000).pipe(map(() => 10 + Math.random() * 50));
  water$ = timer(1800, 8000).pipe(map(() => 500 + Math.random() * 1000));
  animalActivity$ = timer(1000, 5000).pipe(map(() => 50 + Math.random() * 50));

}
