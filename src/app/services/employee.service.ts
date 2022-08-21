import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmployeeData } from '../models/employee-data-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  private subject = new Subject<any>();

  dataSource: EmployeeData[] = [];

  // Data to populate table
  JSONDatas: EmployeeData[] = [
    {
      id: 1, name: "Rohit", age: "27", department: "D1", bloodgroup: "O+", address_array: [{ address: "A1 street" }, { address: "A2 house" }],
      number_array: [{ number: "345678" }, { number: "34567878" }]
    },
    {
      id: 2, name: "Rahul", age: "29", department: "D2", bloodgroup: "A+", address_array: [{ address: "G Nagar" }, { address: "10th street" }],
      number_array: [{ number: "977345678" }, { number: "8834567878" }]
    },
    {
      id: 3, name: "Ramesh", age: "35", department: "M1", bloodgroup: "O+", address_array: [{ address: "North phase" }, { address: "DownTown" }],
      number_array: [{ number: "723456999" }, { number: "7656787899" }]
    },
    {
      id: 4, name: "Akhil", age: "45", department: "D5", bloodgroup: "AB+", address_array: [{ address: "A1 street" }, { address: "22 house" }],
      number_array: [{ number: "997345679" }, { number: "966345678" }]
    },
    {
      id: 5, name: "Anish", age: "33", department: "D1", bloodgroup: "O+", address_array: [{ address: "Lal street" }, { address: "L 12" }],
      number_array: [{ number: "977345678" }, { number: "977345555" }]
    },
    {
      id: 6, name: "Raju", age: "50", department: "G2", bloodgroup: "B+", address_array: [{ address: "B street" }, { address: " AV house" }],
      number_array: [{ number: "977345777" }, { number: "977345999" }]
    },
    {
      id: 7, name: "Nikhil", age: "60", department: "T1", bloodgroup: "O-", address_array: [{ address: "PQ nagar" }, { address: "Town house 12" }],
      number_array: [{ number: "977345678" }, { number: "977345000" }]
    },
    {
      id: 8, name: "Roshan", age: "41", department: "M2", bloodgroup: "B-", address_array: [{ address: "JP nagar" }, { address: "AB 23/20" }],
      number_array: [{ number: "977345222" }, { number: "977345888" }]
    },
    {
      id: 9, name: "Alan", age: "28", department: "D2", bloodgroup: "A-", address_array: [{ address: "K street" }, { address: "23 Rd house" }],
      number_array: [{ number: "977345333" }, { number: "977345111" }]
    },
    {
      id: 10, name: "Babu", age: "28", department: "D3", bloodgroup: "AB-", address_array: [{ address: "27th street" }, { address: "29 Rd house" }],
      number_array: [{ number: "977345000" }, { number: "977345003" }]
    }
  ]


  // To set data to local server
  set(key: string, data: EmployeeData[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // To get data from local server
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  // Method to invoke method from parent component
  sendClickEvent() {
    this.subject.next(value);
  }
  
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  // Method to set data to local server
  setMethod() {
    this.set('KEY', this.JSONDatas);
  }

  // Method to get data from local server
  getMethod() {
    this.dataSource = this.get('KEY');
  }

  // Method to add data
  addEmployeeMethod(data: EmployeeData) {
    this.dataSource.unshift(data);
    console.log(this.dataSource);
  }

  // Method to edit data
  editEmployeeMethod(data: EmployeeData) {
    this.dataSource.forEach((item) => {
      if (item.id == data.id) {
        item.name = data.name;
        item.age = data.age;
        item.bloodgroup = data.bloodgroup;
        item.department = data.department;
        if (item.address_array !== undefined) {
          item.address_array.forEach((address: any, index: any) => {
            if (data.address_array !== undefined) {
              address.address = data.address_array[index].address;
            }
          });
        }
        if (item.number_array !== undefined) {
          item.number_array.forEach((numbers: any, index: any) => {
            if (data.number_array !== undefined) {
              numbers.number = data.number_array[index].number;
            }
          });
        }
      }
    });
    console.log(this.dataSource);
  }

  // Method to delete data
  deleteEmployeeData(data: EmployeeData) {
    this.dataSource.forEach((item, i) => {
      if (item.id == data.id) {
        this.dataSource.splice(i, 1);
      }
    });
    console.log(this.dataSource);
  }

}
function value(value: any, any: any) {
  throw new Error('Function not implemented.');
}

