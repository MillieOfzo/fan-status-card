import {StatusLevel} from '../../shared/ui/status-card/contracts/status-level.enum';
import {IStatusEvaluator} from '../../shared/ui/status-card/contracts/status-evaluator.interface';

/**
 * Evaluator voor luchtdruk.
 */
export class PressureEvaluator implements IStatusEvaluator<number> {

  evaluate(value: number) {
    if (value < 950 || value > 1080) {
      return {status: StatusLevel.Error, label: 'Kritisch'};
    }
    if (value < 980 || value > 1050) {
      return {status: StatusLevel.Warning, label: 'Afwijkend'};
    }
    return {status: StatusLevel.OK, label: 'Normaal'};
  }
}
