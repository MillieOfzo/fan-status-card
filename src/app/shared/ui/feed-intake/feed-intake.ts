import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';

export interface FeedDay {
  day: string;
  value: number; // grams
}

export interface FeedIntakeConfig {
  title: string;
  suffix: string;
  feedData: { day: string; value: number }[];
  warningMin?: number;
  errorMin?: number;
  maxBarHeightPx?: number;
}


@Component({
  selector: 'app-feed-intake',
  imports: [CommonModule],
  templateUrl: './feed-intake.html',
  styleUrl: './feed-intake.css',
})
export class FeedIntake {
  @Input() config!: FeedIntakeConfig;

  maxBarHeightPx = 160;

  // Maak een signal van de data zodat het reactive is
  feedData = signal<{ day: string; value: number }[]>([]);

  // thresholds
  warningMin = 2800;
  errorMin = 2500;

  maxValue = computed(() => {
    const data = this.feedData();
    return data.length ? Math.max(...data.map(d => d.value)) : 1;
  }
  );

  ngOnInit() {
    if (!this.config) {
      throw new Error('FeedIntake requires a config input');
    }

    this.feedData.set(this.config.feedData);
    this.warningMin = this.config.warningMin ?? this.warningMin;
    this.errorMin = this.config.errorMin ?? this.errorMin;
    this.maxBarHeightPx = this.config.maxBarHeightPx ?? this.maxBarHeightPx;
  }

  getHeightPx(value: number): string {
    const max = this.maxValue() || 1;
    const h = (value / max) * this.maxBarHeightPx;
    return `${h}px`;
  }

  getBarBorderColor(value: number) {
    if (value <= this.errorMin) {
      return 'bg-red-600';
    }
    if (value <= this.warningMin) {
      return 'bg-yellow-600';
    }
    return 'bg-green-600';
  }


  // Color based on threshold
  getBarColor(value: number): string {
    if (value <= this.errorMin) {
      return 'bg-red-400';
    }
    if (value <= this.warningMin) {
      return 'bg-yellow-400';
    }
    return 'bg-green-400';
  }
}
