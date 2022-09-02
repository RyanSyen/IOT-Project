import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempNventComponent } from './temp-nvent.component';

describe('TempNventComponent', () => {
  let component: TempNventComponent;
  let fixture: ComponentFixture<TempNventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempNventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempNventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
