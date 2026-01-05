

import {IStatusEvaluator} from '../../shared/ui/status-card/contracts/status-evaluator.interface';
import {StatusLevel} from '../../shared/ui/status-card/contracts/status-level.enum';

export class HumidityEvaluator implements IStatusEvaluator<number> {
  evaluate(value: number) {
    if (value < 20 || value > 80) {
      return { status: StatusLevel.Error, label: 'Ongezond' };
    }
    if (value < 30 || value > 70) {
      return { status: StatusLevel.Warning, label: 'Suboptimaal' };
    }
    return { status: StatusLevel.OK, label: 'Goed' };
  }
}
