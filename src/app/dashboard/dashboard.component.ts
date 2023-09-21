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

  heart_rate = 0;
  humidity = 0;
  temperature = 0;
  public readings:any[] = [];
  ngOnInit(){
   setInterval(()=>{
    this.readings = this.firebaseService.getUpdatedReadings();
     let len = this.readings.length;
     let prev_temp = this.temperature;
     let prev_humidity = this.humidity;
     let prev_hear_rate = this.heart_rate;

     this.temperature = parseInt(this.readings[len-1].temperature);
     this.humidity = parseInt(this.readings[len-1].humidity);
     this.heart_rate = parseInt(this.readings[len-1].heartbeat);

     let temperature_percent = (Math.abs(this.temperature - prev_temp)) / (prev_temp/100);
     
   },4000)

  }

  sendAlert(){
    let len = this.readings.length;
    const latest_reading = this.readings[len-1];
    let latest_gas_readings = {
           'CO': latest_reading.co,
           'H2S': latest_reading.h2s,
           'NH3': latest_reading.nh3,
           'CH4': latest_reading.ch4,
           'Temperature' : latest_reading.temperature,
           'Humidity' : latest_reading.humidity
    }
    const gas_readings = JSON.stringify(latest_gas_readings,null,2);
    const emergencyMessage = `
    URGENT: Workplace Emergency Alert

    This is an emergency alert regarding a sewage worker's exposure to toxic gases. Immediate action is required.
    
    Location: [${latest_reading.lat} , ${latest_reading.lon}]
    Worker's Name: XYZ (id: ${latest_reading.emp_id})
    Current Environmental status: ${gas_readings}
    
    Please take the following steps immediately:
    
    1. Ensure the worker is moved to a safe area with fresh air.
    2. Call emergency services to report the incident.
    3. Contact the nearest medical facility for assistance.
    4. Evacuate the area if necessary to protect other workers. 
    `
    this.messageService.sendSMS(emergencyMessage)
  }

  logout(){
    this.firebaseService.logout();
    this.isLogout.emit();
  }
  
  
 

  
}
