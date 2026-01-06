import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWizard } from './settings-wizard';

describe('SettingsWizard', () => {
  let component: SettingsWizard;
  let fixture: ComponentFixture<SettingsWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
