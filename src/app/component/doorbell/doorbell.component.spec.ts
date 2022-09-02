import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorbellComponent } from './doorbell.component';

describe('DoorbellComponent', () => {
  let component: DoorbellComponent;
  let fixture: ComponentFixture<DoorbellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoorbellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorbellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
