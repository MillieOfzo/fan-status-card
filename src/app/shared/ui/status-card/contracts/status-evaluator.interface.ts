import {StatusLevel} from './status-level.enum';

/**
 * Interface voor het evalueren van een waarde naar een status.
 *
 * De interface zorgt ervoor dat de businesslogica voor het bepalen van een status
 * buiten de UI blijft en niet hardcoded in de component wordt gezet.
 *
 * @template T Het type van de waarde die geëvalueerd wordt (bijv. number voor temp of percentage).
 *
 * @example
 * // Voorbeeld: TemperatureEvaluator implementatie
 * class TemperatureEvaluator implements IStatusEvaluator<number> {
 *   evaluate(value: number) {
 *     if (value < 0 || value > 35) {
 *       return { status: StatusLevel.Error, label: 'Kritisch' };
 *     }
 *     if (value < 5 || value > 30) {
 *       return { status: StatusLevel.Warning, label: 'Afwijkend' };
 *     }
 *     return { status: StatusLevel.OK, label: 'Normaal' };
 *   }
 * }
 *
 * @example
 * // Gebruik in een component met een Observable
 * const temperatureVm$ = temperature$.pipe(
 *   map(value => {
 *     const result = tempEvaluator.evaluate(value);
 *     return {
 *       title: 'Temperatuur',
 *       value: value.toFixed(1) + ' °C',
 *       ...result
 *     };
 *   })
 * );
 *
 * @remarks
 * - De UI-component krijgt enkel een data set met `title`, `value`, `status` en `label`.
 * - Nieuwe evaluaties kunnen toegevoegd worden zonder de component aan te passen.
 */
export interface IStatusEvaluator<T> {
  evaluate(value: T): {
    status: StatusLevel;
    label: string;
  };
}
