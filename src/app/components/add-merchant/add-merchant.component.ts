import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MerchantService } from '../../services/merchant.service';
import { Merchant } from '../../models/merchant';
import { MerchantRule } from '../../models/merchant-rule';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css']
})
export class AddMerchantComponent implements OnInit {

  imageData: Uint8Array;
  merchant: Merchant;
  merchantRule: MerchantRule;
  offerId: string;

  loading: boolean = false;

  color: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private merchantService: MerchantService) { }

  ngOnInit() {
    this.merchant = new Merchant();
    this.merchantRule = new MerchantRule();
  }


  addNewMerchant() {
    this.loading = true;
    this.merchantService.addNewMerchant(this.merchant, this.merchantRule)
      .subscribe(
      data => {
        this.merchantService.addMerchantLogo(data.id, this.imageData)
          .subscribe(
          data => {
            this.loading = false;
            this.router.navigate(['/home', 'merchants']);
          },
          error => {
            this.loading = false;
            console.log(error);
          });
      },
      error => {
        this.loading = false;
        console.log(error);
      });
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
}
