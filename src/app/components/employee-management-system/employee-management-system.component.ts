import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EmployeeData } from 'src/app/models/employee-data-model';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeModalComponent } from '../add-employee-modal/add-employee-modal.component';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';

@Component({
  selector: 'app-employee-management-system',
  templateUrl: './employee-management-system.component.html',
  styleUrls: ['./employee-management-system.component.scss']
})

export class EmployeeManagementSystemComponent implements OnInit {

  displayedColumns: string[] = ['sl', 'name', 'age', 'department', 'bloodgroup', 'address', 'number', 'action'];
  dataSource = new MatTableDataSource<EmployeeData>();
  clickEventsubscription: Subscription;

  constructor(public dialog: MatDialog,
    private employeeService: EmployeeService) {
      
    //To call getData method from other component
    this.clickEventsubscription = this.employeeService.getClickEvent().subscribe(() => {
      this.getDataSource();
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.employeeService.setMethod();
    this.employeeService.getMethod();
    this.getDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Method to open add modal
  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeModalComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource.data = this.employeeService.dataSource;
    });
  }

  //Method to open add modal
  openEditEmployeeModal(element: any): void {
    const dialogRef = this.dialog.open(EditEmployeeModalComponent, {
      width: '600px',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource.data = this.employeeService.dataSource;
    });
  }

  //Method to get data from service
  getDataSource(): void {
    this.dataSource.data = this.employeeService.dataSource;
    console.log(this.dataSource);
  }

  // Method to display all addresses in data
  getAllAddresses(addresArray: any) {
    return addresArray.map((o: { address: any; }) => o.address).join(', ');
  }

  // Method to display all numbers in data
  getAllNumbers(numbersArray: any) {
    return numbersArray.map((o: { number: any; }) => o.number).join(', ');
  }

  // Method to delete employee data
  deleteEmployeeData(element: any) {
    this.employeeService.deleteEmployeeData(element);
    this.getDataSource();
  }
}
