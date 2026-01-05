import { AlarmSeverity } from "./alarm-severity.enum";

export interface IAlarm {
    id: string;
    source: string;
    message: string;
    severity: AlarmSeverity;
    timestamp: Date;
    acknowledged?: boolean;
}