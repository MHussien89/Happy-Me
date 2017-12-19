import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { UserService } from '../../services/user.service';
import { MerchantService } from '../../services/merchant.service';
import { Merchant } from '../../models/merchant';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {

  merchants: Merchant[] = [];
  errorMessage: string;
  loading = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private merchantService: MerchantService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.dtOptions = {
      searching: true
    };
    this.merchantService.getMerchants().subscribe(
      merchants => {
        this.merchants = merchants.merchants;

        this.loading = false;
        this.rerender();
        // console.log(JSON.stringify(this.offers));
      },
      error => {
        this.errorMessage = 'Cannot Load List Of Users';
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
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
