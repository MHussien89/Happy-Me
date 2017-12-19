import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { UserService } from '../../services/user.service';
import { OffersService } from '../../services/offers.service';
import { Offer } from '../../models/offer';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  offers: Offer[] = [];
  errorMessage: string;
  loading = false;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  constructor(private offersService: OffersService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.dtOptions = {
      searching: true
    };
    this.offersService.getOffers('1').subscribe(
      offers => {
        this.offers = offers.offerDtos;
        this.loading = false;
        this.rerender();

        // console.log(JSON.stringify(this.offers));
      },
      error => {
        this.errorMessage = 'Cannot Load List Of Users';
        this.loading = false;
      });
  }

  // rerender(): void {
  //   if (this.dtElement) {
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       // Destroy the table first
  //       dtInstance.destroy();
  //       // Call the dtTrigger to rerender again
  //       this.dtTrigger.next();
  //     });
  //   }

  // }

  deleteOffer(offerId: string) {
    this.offersService.deleteOffer(offerId).subscribe(
      offers => {
        this.offers = this.offers.filter(function (offer) {
          return offer.id !== offerId;
        });
      },
      error => {
        this.errorMessage = 'Cannot Delete the offer';
      });
  }

  editOffer(offerId: string) {
    var currentOffer = this.offers.find(offer => offer.id == offerId);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "title": "Nic",
        "description": "Raboy"
      }
    };

    this.router.navigate(['/home', 'edit-offer'], navigationExtras);
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
