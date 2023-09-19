import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent {
 
  mobileNumber: any = '+919344930703';
  message: any = '';
 
  constructor() {
    
  }

  
  sendMessage() {
    console.log(this.mobileNumber);
    console.log(this.message)
  }



}