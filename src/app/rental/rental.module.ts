import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes,RouterModule} from '@angular/router';



import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalService } from './shared/rental.service';
import {RentalDetailComponent} from './rental-detail/rental-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import {MapModule} from "../common/map/map.module"; 
import { AuthGuard} from "../auth/shared/auth.gaurd";
import { Daterangepicker} from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
 
const routes : Routes=  [
    {path:'rentals',
    component:RentalComponent,
     children:[
         {path:'', component: RentalListComponent},
         {path:':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] },
     ]

}];


@NgModule({

    declarations:[RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        RentalDetailBookingComponent],
    imports :[
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker
   
    ],
      
    providers:[RentalService]

}
    
)

export class RentalModule{

}