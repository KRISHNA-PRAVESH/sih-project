import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { getDatabase, ref, set } from 'firebase/database';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth,private router:Router,private db:AngularFireDatabase) { }

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
    const ref = this.db.list('/readings');
    console.log(ref.valueChanges());
    return ref.valueChanges();
  }

   readings:any[] = []
 
  async readData(){
    await new Promise(async(resolve,reject)=>{
      (await this.fetchData()).subscribe((data)=>{
       
        this.readings = data;
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
