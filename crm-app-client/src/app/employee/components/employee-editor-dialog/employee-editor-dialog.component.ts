import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee, EmployeeService } from 'src/app/core';

@Component({
  selector: 'crm-employee-editor-dialog',
  templateUrl: './employee-editor-dialog.component.html',
  styleUrls: ['./employee-editor-dialog.component.scss']
})
export class EmployeeEditorDialogComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EmployeeEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee, private employeeService: EmployeeService) { 

      this.employeeForm = this.fb.group({
        name: [data.fullName, Validators.required]
      });

    }

  ngOnInit(): void {
  }

  onUpdateClicked(): void {

  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
