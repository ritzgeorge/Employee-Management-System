import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeData } from 'src/app/models/employee-data-model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss']
})
export class EditEmployeeModalComponent implements OnInit {

  edit_employee_form!: FormGroup;
  edited_data!: EmployeeData;
  id: any;

  constructor(private _formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.edit_employee_form = this._formbuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      bloodgroup: new FormControl('', Validators.required),
      address_array: this._formbuilder.array([], Validators.required),
      number_array: this._formbuilder.array([], Validators.required)
    });
    this.employeeEditFormPatch();
    console.log(this.data)
  }

  // Address section
  get address_array(): FormArray {
    return (<FormArray>this.edit_employee_form.get("address_array")) as FormArray;
  }
  // Number section
  get number_array(): FormArray {
    return (<FormArray>this.edit_employee_form.get("number_array")) as FormArray;
  }

  // Method to patch data
  employeeEditFormPatch() {
    this.edit_employee_form.patchValue({
      name: this.data.element.name,
      age: this.data.element.age,
      department: this.data.element.department,
      bloodgroup: this.data.element.bloodgroup
    });
    this.data.element.address_array.forEach((item: any, index: any) => {
      this.newAddress();
      this.address_array.at(index).patchValue({
        address: item?.address
      });
    });
    this.data.element.number_array.forEach((item: any, index: any) => {
      this.newNumber();
      this.number_array.at(index).patchValue({
        number: item?.number
      });
    });
    this.id = this.data.element.id;
  }

  // Method to add new address 
  newAddress() {
    this.address_array.push(
      this._formbuilder.group({
        address: new FormControl("", Validators.required)
      })
    );
  }

  // Method to add new number
  newNumber() {
    this.number_array.push(
      this._formbuilder.group({
        number: new FormControl("", Validators.required)
      })
    );
  }

  // Method to delete address
  deleteAddress(index: any) {
    this.address_array.removeAt(index);
  }

  // Method to delete number
  deleteNumber(index: any) {
    this.number_array.removeAt(index);
  }

  // Method to edit data
  onEditEmployeeSubmit() {
    this.edited_data = this.edit_employee_form.value;
    this.edited_data.id = this.id;
    console.log(this.edited_data);
    this.employeeService.editEmployeeMethod(this.edited_data);
  }
}
