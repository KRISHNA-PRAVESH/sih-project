import { Component } from '@angular/core';


@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent {
 
  mobileNumber: any = '';
  message: any = '';

  constructor() {} // Inject your Twilio service

  
  sendMessage() {
    console.log(this.mobileNumber);
    console.log(this.message)
  }



}