import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedIntake } from './feed-intake';

describe('FeedIntake', () => {
  let component: FeedIntake;
  let fixture: ComponentFixture<FeedIntake>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedIntake]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedIntake);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
