import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusCard } from './status-card';
import { StatusLevel } from './contracts/status-level.enum';
import { IStatusCard } from './contracts/status-card.interface';
import { AlarmSeverity } from './contracts/alarm-severity.enum';

describe('StatusCard (Vitest)', () => {
  let component: StatusCard;
  let fixture: ComponentFixture<StatusCard>;

  const baseData: IStatusCard = {
    title: 'Ventilatie',
    value: '42',
    suffix: '%',
    status: StatusLevel.OK,
    label: 'Normaal',
    alarms: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusCard]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusCard);
    component = fixture.componentInstance;

    component.data = structuredClone(baseData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not toggle alarms when status is OK', () => {
    component.onCardClick();
    expect(component.showAlarms).toBe(false);
  });

});
