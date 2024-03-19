import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumPointComponent } from './sum-point.component';

describe('SumPointComponent', () => {
  let component: SumPointComponent;
  let fixture: ComponentFixture<SumPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
