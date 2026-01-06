import { Component, inject, signal } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from './settings.service';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private readonly fb = inject(FormBuilder)
  private readonly settings = inject(SettingsService)

  activeTab = signal<'display' | 'data' | 'sensors' | 'alarms'>('display');

  form = this.fb.group({
    darkMode: false,
    dataSource: 'test',

    updateIntervalMs: 2000,

    sensorRanges: this.fb.group({
      temperature: this.fb.group({
        min: [-10, Validators.required],
        max: [40, Validators.required]
      }),
      humidity: this.fb.group({
        min: [0],
        max: [100]
      }),
      co2: this.fb.group({
        min: [1500],
        max: [3500]
      }),
      pressure: this.fb.group({
        min: [940],
        max: [1100]
      })
    }),

    alarms: this.fb.group({
      co2Max: [2000],
      temperatureMin: [-5],
      temperatureMax: [35]
    })
  });


  constructor(public darkMode: DarkModeService
  ) {
    this.form.patchValue(this.settings.value);
  }

  save() {
    if (this.form.valid) {
      this.settings.update(this.form.value as any);
    }
  }
}
