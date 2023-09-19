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


    let x_values = [1,2,3,4,5];
    let y_values_1 = [4,2,5,6,10]
    let y_values_2 = [2,1,5,8,4]
    //display chart
    this.chart = new Chart("chart",{
      options:{
        elements:{
          point:{
            borderWidth:1
          }
        },
        animation:{
          duration:0
        }
      },
      data:{
        labels:x_values,
	       datasets: [  
          {
            type: 'line',
            label: "Temperature",
            data: y_values_1,
            borderColor:'green',
            pointBackgroundColor:'black'
          },
          {
            type:'line',
            label:"Humidity",
            data:y_values_2,
            borderColor:'yellow',
            pointBackgroundColor:'black',
          }
          
 
        ]
        
      }
    })
    let c = 6;
    const maxDataPoints = 10;

    //for test
    setInterval(()=>{
      x_values.push(c);
      y_values_1.push(Math.floor(Math.random() * 15) + 1)
      y_values_2.push(Math.floor(Math.random() * 15) + 1);
      if(x_values.length > maxDataPoints){
        x_values.shift();
        y_values_1.shift();
        y_values_2.shift();
      }
      this.chart.data.labels = x_values;
      this.chart.data.datasets[0].data = y_values_1;
      this.chart.data.datasets[1].data = y_values_2
      this.chart.update();
      c++;
    },3000)


    //retrieving data every 5 seconds and updating
    // setInterval(async()=>{
    //   await this.readData();
    //   temperatures = this.readings.map(item => parseInt(item.temperature));
    //   timestamps = this.readings.map(item => item.timestamp);
    //   console.log(temperatures);
    //   console.log(timestamps);
    //   //Dropping past values 
    //   if(timestamps.length > maxDataPoints){
    //     timestamps.shift();
    //     temperatures.shift();
    //   }
    //   this.chart.data.labels = timestamps;
    //   this.chart.data.datasets[0].data = temperatures
    //   this.chart.update();
    // },5000)
   
   
   
    
    
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
