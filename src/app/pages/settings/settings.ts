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

  activeTab = signal<'display' | 'data'>('display');

  form = this.fb.group({
    darkMode: false,
    dataSource: 'test',

    updateIntervalMs: 2000,
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
