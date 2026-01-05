import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStatusCard } from './contracts/status-card.interface';

/**
 * Herbruikbare StatusCardComponent voor dashboards.
 *
 * Deze component is volledig herbruikbaar en kan meerdere keren op één pagina worden gebruikt,
 * met verschillende configuraties per kaart.
 *
 * ### Configuratie
 * De kaart kan geconfigureerd worden via het `@Input` decorator:
 *
 * ```ts
 * const tempCard: IStatusCard = {
 *   title: 'Temperatuur',
 *   value: '21',
 *   suffix: '°C',
 *   status: StatusLevel.OK,
 *   label: 'Normaal'
 *   alarms: [],
 *   title: string;
 * };
 * ```
 *
 * ```html
 * <app-status-card [data]="tempCard"></app-status-card>
 * <app-status-card [data]="humidityCard"></app-status-card>
 * ```
 *
 * - **Losse inputs:** Elke kaart krijgt een `data` object met alle benodigde data (`IStatusCard`).
 * - **Meerdere kaarten:** Je kan een `IStatusCard` data array gebruiken en via `*ngFor` meerdere kaarten renderen.
 *
 * @example
 * <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 *   <ng-container *ngFor="let card of cards">
 *     <app-status-card [data]="card"></app-status-card>
 *   </ng-container>
 * </div>
 *
 * @remarks
 * - De component kent geen businesslogica; status en label worden extern bepaald via een evaluator.
 * - Hierdoor kunnen nieuwe datastromen of andere interpretaties toegevoegd worden zonder componentaanpassing.
 */
@Component({
  selector: 'app-status-card',
  imports: [CommonModule],
  templateUrl: './status-card.html',
  styleUrl: './status-card.scss',
})
export class StatusCard {
  @Input({ required: true }) data!: IStatusCard;

  showAlarms = true;

  onCardClick() {
    if (this.data.status === 'error' && this.data.alarms?.length) {
      this.showAlarms = !this.showAlarms;
    }
  }
}
