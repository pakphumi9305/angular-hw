import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutQuestionComponent } from './layout-question.component';

describe('LayoutQuestionComponent', () => {
  let component: LayoutQuestionComponent;
  let fixture: ComponentFixture<LayoutQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
