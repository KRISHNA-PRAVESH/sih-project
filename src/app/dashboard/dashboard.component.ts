import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

import { Plotly } from 'angular-plotly.js/lib/plotly.interface';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService){}


  ngOnInit(){
   
  }


  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
  }
  
  
 

  
}
