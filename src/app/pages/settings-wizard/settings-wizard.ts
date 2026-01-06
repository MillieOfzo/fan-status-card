import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../settings/settings.service';
import { CommonModule } from '@angular/common';
import { IDynamicEvaluatorConfig } from '../../core/status/dynamic.evaluator';

@Component({
  selector: 'app-settings-wizard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings-wizard.html',
  styleUrl: './settings-wizard.css',
})
export class SettingsWizard {
  private fb = inject(FormBuilder);
  private settings = inject(SettingsService);

  form: FormGroup;

  // Index van de geselecteerde card (null als niets geselecteerd)
  selectedCardIndex = signal<number | null>(null);
  successMessage = signal<string | null>(null);

  constructor() {
    const configs: IDynamicEvaluatorConfig[] = this.settings.statusCardConfigs() || [];

    this.form = this.fb.group({
      cards: this.fb.array(configs.map(c => this.createCardGroup(c)))
    });
  }

  get cards(): FormArray<FormGroup> {
    return this.form.get('cards') as FormArray<FormGroup>;
  }

  createCardGroup(config?: any): FormGroup {
    return this.fb.group({
      type: [config?.type || 'temperature'],
      title: [config?.title || 'Nieuwe kaart'],
      source: [config?.source || 'temperature$'],
      suffix: [config?.suffix || ''],
      warningMin: [config?.warningMin || null],
      errorMin: [config?.errorMin || null],
      warningMax: [config?.warningMax || null],
      errorMax: [config?.errorMax || null],
      okLabel: [config?.okLabel || 'OK'],
      warningLabel: [config?.warningLabel || 'Warning'],
      errorLabel: [config?.errorLabel || 'Error'],
    });
  }

  addCard() {
    this.cards.push(this.createCardGroup());
    this.selectedCardIndex.set(this.cards.length - 1); // direct selecteren
  }

  removeCard(index: number) {
    this.cards.removeAt(index);
    // als de verwijderde card de geselecteerde was, reset
    if (this.selectedCardIndex() === index) this.selectedCardIndex.set(null);
  }

  selectCard(index: number) {
    this.selectedCardIndex.set(index);
  }

  save() {
    const configs = this.cards.value;
    this.settings.updateCards(configs);

    // Succesmelding 2 seconden tonen
    this.successMessage.set('Instellingen succesvol opgeslagen!');
    setTimeout(() => this.successMessage.set(null), 2000);
  }
}
