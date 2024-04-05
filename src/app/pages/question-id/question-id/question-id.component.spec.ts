import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionIdComponent } from './question-id.component';

describe('QuestionIdComponent', () => {
  let component: QuestionIdComponent;
  let fixture: ComponentFixture<QuestionIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
