import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public pie_chart:any;
  
  constructor(private firebaseService:FirebaseService) {}

  async ngOnInit() {
   await this.firebaseService.readData();
  //  console.log(this.firebaseService.getUpdatedReadings())
   this.pie_chart = new Chart("pie_chart",{
    type:'pie',
    data:{
      labels:['Red','Blue','Yellow','Green','Purple'],
    datasets: [{
      label: 'My First Dataset',
      data: ['300', '50', '100','20','80'],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(200,20,59)',
        'rgb(100,25,95)'
      ],
      hoverOffset: 4
    }]
   }
   })

   setInterval(()=>{
    this.pie_chart.data.datasets[0].data = this.pie_chart.data.datasets[0].data.reverse();
    this.pie_chart.update();
   },3000)

}

}
