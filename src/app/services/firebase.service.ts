import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MessageService } from './message.service';

import { getDatabase, ref, set } from 'firebase/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth,private router:Router,private db:AngularFireDatabase,private messageService:MessageService) { }

  async signIn(email: string, password: string){

    await this.firebaseAuth.signInWithEmailAndPassword(email,password) 
    .then((res) =>{
      // console.log(res);
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user));
      this.router.navigate(['dashboard'])
    })
    .catch((err) =>{
      console.log("Error"+err.message);
      alert(err.message);
      this.router.navigate(['login'])
    })
  }

  async insert(userId:string,name:string,email:string,imageUrl:string){
    const data = {
      userId,name,email,imageUrl
    }
    const ref = this.db.list('/messages');
    return ref.push(data);

  }
  private async fetchData(){
    const ref = this.db.list('/worker');
    console.log(ref.valueChanges());
    return ref.valueChanges();
  }

   readings:any[] = []
 
  async readData(){
    await new Promise(async(resolve,reject)=>{
      (await this.fetchData()).subscribe((data)=>{
        let clean_data: any[] = []
        data.forEach((reading:any)=>{
          const data = reading.data.split('#');
         
          const structured_json = {
              id: data[0],
              h2s: data[1],
              nh3: data[2],
              co: data[3],
              ch4:data[4],
              temperature:data[5],
              humidity:data[6],
              heartbeat:data[7],
              emp_id: data[8],
              sos: data[9],
              lat: data[10],
              lon: data[11]
          };
          //If for any data 'sos' becomes 'yes', send an immediate alert sms to the supervisor through message service
          if(structured_json.sos == 'yes'){ 
            //check for redundant emergency messages: -> previous sos
            //invoke sendSMS() function at message service
            // this.messageService.sendSMS("An Emergency Occured !");
          }
          clean_data.push(structured_json);
        })
        this.readings = clean_data
        console.log(this.readings);
        resolve(data);
      });
    });
    return this.readings;
  }



  getUpdatedReadings(){
    return this.readings;
  }


  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
}
