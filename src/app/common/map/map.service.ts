import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { CamelizePipe} from 'ngx-pipes';
import { of } from 'rxjs';

@Injectable()
export class MapService {  
   
    private locationCache:any={};   
    private geoCoder;

    constructor(private camelizePipe:CamelizePipe){
               console.log(this.locationCache);}      
        
    
private cacheLocation(location:string,coordinates:any){
       this.locationCache[this.camelize(location)] =coordinates ;
}
private camelize(value:string):string{
     return this.camelizePipe.transform(value);
} 
private isLocationCached (location:string) :Boolean{
    return this.locationCache[this.camelize(location)];
}
private geoCodeLocation(location:string):Observable<any>{

    if(!this.geoCoder) {this.geoCoder = new (<any>window).google.maps.Geocoder;}  
   return new Observable((observer)=>{
    this.geoCoder.geocode({address:location},(result,status)=>{
        if(status === "OK"){
           
            const geometry = result[0].geometry.location;
            const coordinates = {lat:geometry.lat(),lng:geometry.lng()};
           
               this.cacheLocation(location,coordinates);
               console.log(this.locationCache);
          
            observer.next(coordinates); 
        }
        else{
            
            observer.error('Location could not be geocoded');
        }
 })           
   });
}

 public getGeoLocation(location:string): Observable<any> {
     console.log(location);;
       if(this.isLocationCached(location)){
              return  of(this.locationCache[this.camelize(location)]);
        }else{    
            return this.geoCodeLocation(location )
        }}
}
