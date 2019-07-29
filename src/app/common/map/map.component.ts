import { Component,Input,ChangeDetectorRef  } from '@angular/core';
import { MapService} from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() location:string;

  isPositionError : Boolean = false;  
  title: string = 'My first AGM project';
  lat: number ;
  lng: number ; 
  constructor( private mapService :MapService,private ref:ChangeDetectorRef) { }


 mapReadyHandler(){
    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates)=>{
           this.lat = coordinates.lat;
           this.lng = coordinates.lng;
           this.ref.detectChanges();
      },
      (err)=>{
          this.isPositionError = true;
      }
    )
  }
}
