import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OffersService } from '../../services/offers.service';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  offer: Offer;
  offerId: string;

  loading: boolean = false;

  constructor(private offersService: OffersService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.offer = new Offer();
    this.loading = true;
    this.offerId = this.route.snapshot.params['id'] || null;

    if (this.offerId) {
      this.offersService.getOfferById(this.offerId).subscribe(
        offer => {
          this.offer = offer.offerDto;
          this.loading = false;
        },
        error => {
          // this.errorMessage = 'Cannot Load List Of Users';
          this.loading = false;
        });
    }
  }


  editOffer() {
    this.loading = true;
    this.offersService.editOffer(this.offer)
      .subscribe(
      data => {
        this.loading = false;
        this.router.navigate(['/home', 'offers']);
      },
      error => {
        this.loading = false;
        console.log(error);
      });


  }

}
