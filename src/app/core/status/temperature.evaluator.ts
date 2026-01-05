import {IStatusEvaluator} from '../../shared/ui/status-card/contracts/status-evaluator.interface';
import {StatusLevel} from '../../shared/ui/status-card/contracts/status-level.enum';

export class TemperatureEvaluator implements IStatusEvaluator<number> {
  evaluate(value: number) {
    if (value < 0 || value > 35) {
      return {status: StatusLevel.Error, label: 'Kritisch'};
    }
    if (value < 5 || value > 30) {
      return {status: StatusLevel.Warning, label: 'Afwijkend'};
    }
    return {status: StatusLevel.OK, label: 'Normaal'};
  }
}
