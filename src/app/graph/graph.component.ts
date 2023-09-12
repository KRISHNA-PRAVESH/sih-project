import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit{

  ngOnInit(){
    this.basicChart();
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
