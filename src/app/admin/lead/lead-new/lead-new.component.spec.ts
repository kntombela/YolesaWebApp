import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadNewComponent } from './lead-new.component';

describe('LeadNewComponent', () => {
  let component: LeadNewComponent;
  let fixture: ComponentFixture<LeadNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
