import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditorDialogComponent } from './employee-editor-dialog.component';

describe('EmployeeEditorDialogComponent', () => {
  let component: EmployeeEditorDialogComponent;
  let fixture: ComponentFixture<EmployeeEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEditorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
