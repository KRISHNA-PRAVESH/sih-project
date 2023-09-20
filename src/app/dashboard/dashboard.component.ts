import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
              '../assets/css/atlantis.min.css']
})
export class DashboardComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService,private messageService:MessageService){}


  ngOnInit(){
   
  }

  sendAlert(){
    this.messageService.sendSMS("Emergency!")
  }

  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
  }
  
  
 

  
}
