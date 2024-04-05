import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutQuestionBodyComponent } from './layout-question-body.component';

describe('LayoutQuestionBodyComponent', () => {
  let component: LayoutQuestionBodyComponent;
  let fixture: ComponentFixture<LayoutQuestionBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutQuestionBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutQuestionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
