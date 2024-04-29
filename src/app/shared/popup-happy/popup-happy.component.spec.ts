import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHappyComponent } from './popup-happy.component';

describe('PopupHappyComponent', () => {
  let component: PopupHappyComponent;
  let fixture: ComponentFixture<PopupHappyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupHappyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupHappyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
