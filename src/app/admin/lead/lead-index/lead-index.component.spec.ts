import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadIndexComponent } from './lead-index.component';

describe('LeadIndexComponent', () => {
  let component: LeadIndexComponent;
  let fixture: ComponentFixture<LeadIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
