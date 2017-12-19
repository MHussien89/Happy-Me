import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  errorMessage: string;
  loading = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    this.dtOptions = {
      searching: true
    };
    this.userService.getResellerUsers('1').subscribe(
      users => {
        this.users = users;

        this.loading = false;
        this.rerender();
        console.log(JSON.stringify(this.users));
      },
      error => {
        this.errorMessage = 'Cannot Load List Of Users';
        this.loading = false;
      });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  onAddRetailers() {
    this.userService.getResellerUsers('1').subscribe(
      users => {
        this.users = users;
        this.rerender();
        console.log(JSON.stringify(this.users));
      },
      error => {
        this.errorMessage = 'Cannot Load List Of Users';
      });
  }

  rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }

  }

}
