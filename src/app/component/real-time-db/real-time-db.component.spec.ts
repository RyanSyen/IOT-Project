import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeDBComponent } from './real-time-db.component';

describe('RealTimeDBComponent', () => {
  let component: RealTimeDBComponent;
  let fixture: ComponentFixture<RealTimeDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTimeDBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
