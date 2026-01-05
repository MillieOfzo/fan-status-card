/**
 * Configuratie van drempelwaarden voor een evaluator of statuskaart.
 * 
 * Hiermee kan per meting of parameter worden bepaald bij welke waarde
 * een waarschuwing (warning) of fout (error) wordt getoond.
 * 
 * Alle velden zijn optioneel; als een veld niet is opgegeven, wordt het
 * niet meegenomen bij de evaluatie.
 * 
 * Voorbeeld:
 * ```ts
 * const co2Thresholds: IThresholdConfig = {
 *   warningMin: 1800,  // Waarschuwing als CO₂ ≥ 1800 ppm
 *   errorMin: 3000     // Error als CO₂ ≥ 3000 ppm
 * };
 * ```
 */
export interface IThresholdConfig {
    /** Minimale waarde waarbij een waarschuwing (warning) wordt gegeven */
    warningMin?: number;

    /** Maximale waarde waarbij een waarschuwing (warning) wordt gegeven */
    warningMax?: number;

    /** Minimale waarde waarbij een fout (error) wordt gegeven */
    errorMin?: number;

    /** Maximale waarde waarbij een fout (error) wordt gegeven */
    errorMax?: number;
}
