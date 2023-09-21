import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient,private snackBar:MatSnackBar) { }

  sendSMS(body:string){
    console.log(body);
    this.http.post('http://localhost:3000/alert',body).subscribe({
      error:(err)=>{
        console.log(err);
        this.snackBar.open("Error","Ok",{duration:2000,verticalPosition:'bottom',horizontalPosition:'right'})

      },
      complete:()=>{
        this.snackBar.open("Alert Message Sent","Ok",{duration:2000,verticalPosition:'bottom',horizontalPosition:'right'})
      }
    })
  }
}
