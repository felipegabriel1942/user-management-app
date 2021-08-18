import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailFormComponent } from './admin-email-form.component';

describe('AdminEmailFormComponent', () => {
  let component: AdminEmailFormComponent;
  let fixture: ComponentFixture<AdminEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
