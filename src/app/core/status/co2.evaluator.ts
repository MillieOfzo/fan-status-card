
import { IThresholdConfig } from "../../shared/ui/status-card/contracts/config-treshold.interface";
import { IStatusEvaluator } from "../../shared/ui/status-card/contracts/status-evaluator.interface";
import { StatusLevel } from "../../shared/ui/status-card/contracts/status-level.enum";

export class Co2Evaluator implements IStatusEvaluator<number> {

    constructor(private config: IThresholdConfig = {
        warningMin: 2000,
        errorMin: 3000
    }) { }

    evaluate(value: number) {
        if (this.config.errorMin && value >= this.config.errorMin) {
            return { status: StatusLevel.Error, label: 'Te hoog' };
        }

        if (this.config.warningMin && value >= this.config.warningMin) {
            return { status: StatusLevel.Warning, label: 'Ventilatie laag' };
        }

        return { status: StatusLevel.OK, label: 'Goed' };
    }
}