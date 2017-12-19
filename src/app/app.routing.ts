import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { AddMerchantComponent } from './components/add-merchant/add-merchant.component';
import { OffersComponent } from './components/offers/offers.component';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { RetailersComponent } from './components/retailers/retailers.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'retailers', pathMatch: 'full' },
            { path: 'retailers', component: RetailersComponent },
            { path: 'offers', component: OffersComponent },
            { path: 'add-offer', component: AddOfferComponent },
            { path: 'edit-offer/:id', component: EditOfferComponent },
            { path: 'merchants', component: MerchantsComponent },
            { path: 'add-merchant', component: AddMerchantComponent },
        ]
    },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);