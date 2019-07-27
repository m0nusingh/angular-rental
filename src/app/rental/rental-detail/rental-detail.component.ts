import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

   
  rental : Rental;
  constructor(private route: ActivatedRoute,
    private rentalService : RentalService ) { } 

  ngOnInit() {
    this.rental = new Rental();
     this.route.params.subscribe(
       (params)=>{
          (
          this.getRental(params['rentalId']))
       })
  }


  getRental(rentalId: string){
       this.rentalService.getRentalById(rentalId).subscribe(
         (rental:Rental)=>{
          this.rental = rental;
         })

  } 

}
