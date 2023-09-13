import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit{

  constructor(private firebaseService : FirebaseService){ }
  ngOnInit(){
    this.basicChart();
    this.readData();
  }

  //writing data to firebase
  async writeUserData(userId:string, name:string, email:string, imageUrl:string) {
     this.firebaseService.insert(userId,name,email,imageUrl)
      .then(()=>{
        console.log("Success, inserted data");
      })
      .catch(err => {
        console.error("Error: "+err);
      })
  }

  //reading data from firebase - realtime
  data: any[] = [];

  async readData(){
    (await this.firebaseService.fetchData()).subscribe((data)=>{
      this.data = data;
      console.log("Data Arrived: ");
      console.log(this.data);
    });
   
  }






  public chart: any;
  basicChart(){
    this.chart = new Chart("chart",{
      type: 'line',
      data:{
        labels:['Jan','Feb','Mar','Apr','May'],
	       datasets: [  
         
          {
            label: "Sales",
            data: [1000,1200,800,1500,2000],
            borderColor:'green',
            pointBackgroundColor:'black'
          }  
        ]
      }
    })
}
}
