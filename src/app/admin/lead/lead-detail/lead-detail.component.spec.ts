import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailComponent } from './lead-detail.component';

describe('LeadDetailComponent', () => {
  let component: LeadDetailComponent;
  let fixture: ComponentFixture<LeadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
