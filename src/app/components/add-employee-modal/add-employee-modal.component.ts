import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeData } from 'src/app/models/employee-data-model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.scss']
})
export class AddEmployeeModalComponent implements OnInit {

  add_employee_form!: FormGroup;
  newData!: EmployeeData;
  id: number = 10;
  constructor(private _formbuilder: FormBuilder,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.add_employee_form = this._formbuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      bloodgroup: new FormControl('', Validators.required),
      address_array: this._formbuilder.array([], Validators.required),
      number_array: this._formbuilder.array([], Validators.required)
    });

    this.newAddress();
    this.newNumber();
  }



  // Address section
  get address_array(): FormArray {
    return (<FormArray>this.add_employee_form.get("address_array")) as FormArray;
  }

  // Number section
  get number_array(): FormArray {
    return (<FormArray>this.add_employee_form.get("number_array")) as FormArray;
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

  // Method to add employee data
  onAddEmployeeSubmit() {
    console.log(this.add_employee_form.value);
    this.newData = this.add_employee_form.value;
    this.newData.id = this.id + 1;
    this.id++;
    console.log(this.newData);
    this.employeeService.addEmployeeMethod(this.newData);
    this.employeeService.sendClickEvent();
  }
}
