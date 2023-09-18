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

  public chart: any;
  async ngOnInit(){
    await this.readData();
    let temperatures = this.readings.map(item => parseInt(item.temperature));
    let timestamps = this.readings.map(item => item.timestamp);
    console.log(this.readings);
    // console.log(temperatures); // Array of temperatures
    // console.log(timestamps);   // Array of timestamps

    //display chart
    this.chart = new Chart("chart",{
      type: 'line',
      data:{
        labels:timestamps,
	       datasets: [  
          {
            label: "Temperature",
            data: temperatures,
            borderColor:'green',
            pointBackgroundColor:'black'
          }  
        ]
      }
    })
    
  


    //retrieving data every 5 seconds and updating
    setInterval(async()=>{
      await this.readData();
      temperatures = this.readings.map(item => parseInt(item.temperature));
      timestamps = this.readings.map(item => item.timestamp);
      console.log(temperatures);
      console.log(timestamps);
      this.chart.data.labels = timestamps;
      this.chart.data.datasets[0].data = temperatures
      this.chart.update();
    },5000)
   
   
   
    
    
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
  readings: any[] = [];

  async readData(){
    await new Promise(async(resolve,reject)=>{
      (await this.firebaseService.fetchData()).subscribe((data)=>{
        this.readings = data;
        resolve(data);
      });
    });
    return this.readings;
     
  }





  public data:any[] = []

  async basicChart(readings:any[]){
    // this.data = await this.readData();
    // console.log("heree: ");
    // console.log(this.data);
    console.log("Inside chart function: ");
    const temperatures = readings.map(item => parseInt(item.temperature));
    const timestamps = readings.map(item => item.timestamp);
    
    console.log(temperatures); // Array of temperatures
    console.log(timestamps);   // Array of timestamps
    this.chart = new Chart("chart",{
      type: 'line',
      data:{
        labels:timestamps,
	       datasets: [  
          {
            label: "Temperature",
            data: temperatures,
            borderColor:'green',
            pointBackgroundColor:'black'
          }  
        ]
      }
    })
 }
}
