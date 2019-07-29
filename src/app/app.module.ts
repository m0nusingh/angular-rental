import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Routes,RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent}  from './common/header/header-component';
import {RentalModule} from './rental/rental.module';


const routes : Routes=  [
  {path:'',redirectTo:'/rentals',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    RentalModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
