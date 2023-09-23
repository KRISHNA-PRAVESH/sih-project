import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { FirebaseService } from '../services/firebase.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit{

  constructor(private firebaseService : FirebaseService){ }

  public chart: any;
  fetchable:boolean = false;
   //reading data from firebase - realtime
   readings: any[] = [];
  async ngOnInit(){
    this.readings = await this.firebaseService.readData();
    let len = this.readings.length;
    //slicing to latest 50 readings
    this.readings = this.readings.slice(-50,len)
    // console.log(this.readings);
    let co_readings = this.readings.map(item => item.co);
    let h2s_readings = this.readings.map(item => item.h2s);
    let nh3_readings = this.readings.map(item => item.nh3);
    let ch4_readings = this.readings.map(item => item.ch4);
  
    // let timestamps = this.readings.map(item => item.timestamp);
    // console.log(co_readings);
    // console.log(h2s_readings);
    // console.log(nh3_readings);
    // console.log(ch4_readings);
  
  
    // console.log(temperatures); // Array of temperatures
    // console.log(timestamps);   // Array of timestamps


    let x_values = [''];
    for(let i=1;i<=49;i++){
      x_values.push('');
    }
    let y_values_1 = co_readings
    let y_values_2 = h2s_readings
    let y_values_3 = nh3_readings
    let y_values_4 = ch4_readings

    //display chart
    this.fetchable = true;
    const plots = [
      {
        type: 'line',
        label: "CO",
        data: y_values_1,
        borderColor:'green',
        pointBackgroundColor:'black'
      },
      {
        type:'line',
        label:"H2S",
        data:y_values_2,
        borderColor:'yellow',
        pointBackgroundColor:'black',
      },
      {
        type:'line',
        label:"NH3",
        data:y_values_3,
        borderColor:'blue',
        pointBackgroundColor:'black',
      },
      {
        type:'line',
        label:"CH4",
        data:y_values_4,
        borderColor:'red',
        pointBackgroundColor:'black',
      },
    ]
    this.displayChart(x_values,plots)
    let c = 6;
    const maxDataPoints = 500;

    //for test
    setInterval(()=>{

      this.readings =  this.firebaseService.getUpdatedReadings();

      let len = this.readings.length;
      //getting the latest 50 values
      this.readings = this.readings.slice(-50,len);
      co_readings = this.readings.map(item => item.co);
      h2s_readings = this.readings.map(item => item.h2s);
      nh3_readings = this.readings.map(item => item.nh3);
      ch4_readings = this.readings.map(item => item.ch4);
    
       y_values_1 = co_readings
       y_values_2 = h2s_readings
       y_values_3 = nh3_readings
       y_values_4 = ch4_readings
      
      
      // co-1,h2s-2, nh3-3, ch4-4 , so2 -5
      this.chart.data.labels = x_values;
      //if CO chip is clicked, display only the CO data
      if(this.CO){
        const plots = [
          {
            type: 'line',
            label: "CO",
            data: y_values_1,
            borderColor:'green',
            pointBackgroundColor:'black'
          }
        ]
        this.chart.data.datasets = plots;
        this.chart.update(); 
      }
      else if(this.H2S){
        const plots = [
          {
            type: 'line',
            label: "H2S",
            data: y_values_2,
            borderColor:'yellow',
            pointBackgroundColor:'black'
          }
        ]
        this.chart.data.datasets = plots
        this.chart.update();
      }
      else if(this.NH3){
        const plots = [{
          type:'line',
          label:"NH3",
          data:y_values_3,
          borderColor:'blue',
          pointBackgroundColor:'black',
        }]
        this.chart.data.datasets = plots;
        this.chart.update();
      }
      else if(this.CH4){
        const plots = [
          {
            type:'line',
            label:"CH4",
            data:y_values_4,
            borderColor:'red',
            pointBackgroundColor:'black',
          }
        ]
        this.chart.data.datasets = plots;
        this.chart.update();
      }
      else{
        const plots = [
          {
            type: 'line',
            label: "CO",
            data: y_values_1,
            borderColor:'green',
            pointBackgroundColor:'black'
          },
          {
            type:'line',
            label:"H2S",
            data:y_values_2,
            borderColor:'yellow',
            pointBackgroundColor:'black',
          },
          {
            type:'line',
            label:"NH3",
            data:y_values_3,
            borderColor:'blue',
            pointBackgroundColor:'black',
          },
          {
            type:'line',
            label:"CH4",
            data:y_values_4,
            borderColor:'red',
            pointBackgroundColor:'black',
          },
        ]
        this.chart.data.datasets = plots;
       this.chart.update();
      }
      c++;
    },3000)

    // setInterval(()=>{
    //   this.readings = this.firebaseService.getUpdatedReadings();
    //   console.log(this.readings);
    // },10000)


    //retrieving data every 5 seconds and updating
    // setInterval(async()=>{
    //   await this.readData(); //is it necessary? the array will be automatically updated when new data arrives coz of subscribe()
    //   or this.readings = this.firebaseService.getUpdatedReadings();
    //temperatures = this.readings.map(item => parseInt(item.temperature));
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

  //variables for toggles
  CO:boolean = false;
  H2S:boolean = false;
  NH3:boolean = false;
  CH4:boolean = false
  
  chipSelected(chip:string){
    if(chip == 'CO'){
      this.CO = !this.CO;
      //set everything else to false (edge case where use didn't deselect a chip, instead he select another chip, the toggled value will stay true)
      this.H2S = false;
      this.NH3 = false;
      this.CH4 = false;
      
    }
    else if(chip == 'NH3'){
      //filter chart
      this.NH3 = !this.NH3;

      this.H2S = false;
      this.CO = false;
      this.CH4 = false;
     
    }
    else if(chip == 'H2S'){
      //filter chart 
      this.H2S = !this.H2S;

      this.CO = false;
      this.NH3 = false;
      this.CH4 = false;
   
    }
    else {
      this.CH4 = !this.CH4;

      this.H2S = false;
      this.NH3 = false;
      this.CO = false;
      
    }
    
  }
 
  

  displayChart(x_values:any[],plots:any[]){
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
	      datasets: plots
      }
      
    })
  }
}
