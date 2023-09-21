import { Component,OnInit} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-live-table',
  templateUrl: './live-table.component.html',
  styleUrls: ['./live-table.component.css']
})
export class LiveTableComponent implements OnInit  {

  constructor(private firebaseService: FirebaseService){}
  public readings:any[] = [];
  ngOnInit() {

    setInterval(()=>{
      this.readings = this.firebaseService.getUpdatedReadings();
      let len = this.readings.length;
      //slicing the latest 10 readings
      this.readings = this.readings.slice(-10,len).reverse();

    },4000)

  }
 


}
