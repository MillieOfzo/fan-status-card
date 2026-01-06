import { IStatusEvaluator } from "../../shared/ui/status-card/contracts/status-evaluator.interface";
import { StatusLevel } from "../../shared/ui/status-card/contracts/status-level.enum";

export interface IDynamicEvaluatorConfig {
    type: 'co2' | 'temperature' | 'humidity' | 'pressure' | 'custom';
    title: string;
    source: string; // Observable name in TestDataService
    suffix?: string;

    warningMin?: number;
    errorMin?: number;
    warningMax?: number;
    errorMax?: number;

    // Labels per status
    okLabel?: string;
    warningLabel?: string;
    errorLabel?: string;
}


export class DynamicEvaluator implements IStatusEvaluator<number> {
    constructor(private config: IDynamicEvaluatorConfig) { }

    evaluate(value: number) {
        // Min thresholds
        if (this.config.errorMin != null && value >= this.config.errorMin) {
            return { status: StatusLevel.Error, label: this.config.errorLabel || 'Error' };
        }
        if (this.config.warningMin != null && value >= this.config.warningMin) {
            return { status: StatusLevel.Warning, label: this.config.warningLabel || 'Warning' };
        }

        // Max thresholds
        if (this.config.errorMax != null && value <= this.config.errorMax) {
            return { status: StatusLevel.Error, label: this.config.errorLabel || 'Error' };
        }
        if (this.config.warningMax != null && value <= this.config.warningMax) {
            return { status: StatusLevel.Warning, label: this.config.warningLabel || 'Warning' };
        }

        return { status: StatusLevel.OK, label: this.config.okLabel || 'OK' };
    }
}
