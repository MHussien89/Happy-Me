import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OffersService } from '../../services/offers.service';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  imageData: Uint8Array;
  offer: Offer;
  offerId: string;

  loading: boolean = false;

  constructor(private offersService: OffersService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.offer = new Offer();
  }

  private fileChangeEvent(fileInput: any) {
    var self = this;
    var reader = new FileReader();
    reader.onload = function () {
      var arrayBuffer = this.result;
      var array = new Uint8Array(arrayBuffer);
      self.imageData = fileInput.target.files[0];
      var binaryString = String.fromCharCode.apply(null, array);
    }
    reader.readAsArrayBuffer(fileInput.target.files[0]);

    // }

  }

  addNewOffer() {
    this.loading = true;
    this.offersService.addNewOffer(this.offer)
      .subscribe(
      data => {
        this.offersService.addOfferImage(data.id, this.imageData)
          .subscribe(
          data => {
            this.loading = false;
            this.router.navigate(['/home', 'offers']);
          },
          error => {
            this.loading = false;
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });


  }

}
