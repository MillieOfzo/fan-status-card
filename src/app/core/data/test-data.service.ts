import {Injectable} from '@angular/core';
import {interval, map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestDataService {
  // Interval in Milliseconds
  temperature$ = interval(2000).pipe(
    map(() => -10 + Math.random() * 50)
  );

  humidity$ = interval(4000).pipe(
    map(() => Math.random() * 100)
  );

  pressure$ = interval(5000).pipe(
    map(() => 940 + Math.random() * 150)
  );
}
