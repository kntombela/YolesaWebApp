import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadEditComponent } from './lead-edit.component';

describe('LeadEditComponent', () => {
  let component: LeadEditComponent;
  let fixture: ComponentFixture<LeadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
