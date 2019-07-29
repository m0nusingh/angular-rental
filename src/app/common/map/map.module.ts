
import { NgModule } from '@angular/core';
import {MapComponent} from './map.component';
import {AgmCoreModule} from '@agm/core'; 
import {MapService} from './map.service';   
import { CamelizePipe} from 'ngx-pipes';
import {CommonModule} from '@angular/common';
import {API} from "../../../../server/config/dev";

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [ 
    AgmCoreModule.forRoot({
        apiKey: API,
     
      }),
      CommonModule
    
  ],
  exports:[
    MapComponent
  ],

  providers: [
    MapService,
    CamelizePipe
  ],
 
})
export class MapModule { }
