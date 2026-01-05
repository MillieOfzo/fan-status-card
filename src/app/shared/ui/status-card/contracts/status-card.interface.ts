import { IAlarm } from './alarm.interface';
import { StatusLevel } from './status-level.enum';


/**
 * Interface voor het contract van een statuskaart.
 *
 * Deze interface definieert de data die de component nodig heeft
 * om een statuskaart weer te geven.
 * Alle logica voor het bepalen van `status` of `label` gebeurt buiten de component,
 * bijvoorbeeld via een `IStatusEvaluator`.
 *
 * @example
 * // Voorbeeld: temperatuurkaart
 * const tempCard: IStatusCard = {
 *   title: 'Temperatuur',
 *   value: '22.5',
 *   suffix: '°C'
 *   status: StatusLevel.OK,
 *   alarms: [],
 *   label: 'Normaal' * 
 * };
 *
 * @example
 * // Voorbeeld: vochtigheidskaart
 * const humidityCard: IStatusCard = {
 *   title: 'Luchtvochtigheid',
 *   value: '75',
 *   suffix: '%'
 *   status: StatusLevel.Error,
 *   alarms: ['Ventilator 1 werkt niet'],
 *   label: 'Hoog'
 * };
 *
 * @remarks
 * - UI-componenten zoals `StatusCardComponent` krijgen een object van dit type via @Input decorator.
 * - Nieuwe soorten datastromen kunnen hetzelfde model gebruiken, zolang `status` en `label` maar via een evaluator komen.
 */
export interface IStatusCard {
  title: string;
  value: string;
  suffix?: string;
  status: StatusLevel;
  label: string;
  alarms?: IAlarm[];
}