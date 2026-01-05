import { IStatusEvaluator } from "../../shared/ui/status-card/contracts/status-evaluator.interface";
import { StatusLevel } from "../../shared/ui/status-card/contracts/status-level.enum";

/**
 * Evaluator voor CO₂ concentratie (ppm).
 *
 * Gebaseerd op gangbare stal- en klimaatrichtlijnen.
 */
export class Co2Evaluator implements IStatusEvaluator<number> {

    evaluate(value: number): { status: StatusLevel; label: string } {

        if (value > 3000) {
            return {
                status: StatusLevel.Error,
                label: 'Te hoog'
            };
        }

        if (value >= 2000) {
            return {
                status: StatusLevel.Warning,
                label: 'Ventilatie laag'
            };
        }

        return {
            status: StatusLevel.OK,
            label: 'Goed'
        };
    }
}
