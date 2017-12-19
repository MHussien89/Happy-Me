import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTablesModule } from 'angular-datatables';
// import { ColorPickerModule } from 'ngx-color-picker';

// import { DataTableModule } from "angular2-datatable";

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { OffersService } from './services/offers.service';
import { MerchantService } from './services/merchant.service';


import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';
import { RetailersComponent } from './components/retailers/retailers.component';
import { AddRetailerComponent } from './components/add-retailer/add-retailer.component';


import { OffersComponent } from './components/offers/offers.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { AddMerchantComponent } from './components/add-merchant/add-merchant.component';
import { MerchantsComponent } from './components/merchants/merchants.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RetailersComponent,
    AddRetailerComponent,
    OffersComponent,
    AddOfferComponent,
    EditOfferComponent,
    AddMerchantComponent,
    MerchantsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DataTablesModule
  ],
  providers: [AuthGuard, AuthenticationService, UserService, OffersService,
    MerchantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
