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
  //   const db = getDatabase();
  //  set(ref(db, 'users/' + userId), {
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // }).then(()=>{
  //   console.log("Data inserted into firebase")
  // })
  // .catch((err)=>{
  //   console.log("Error: "+err);
  // })
  }
  async fetchData(){
    const ref = this.db.list('/readings');
    return ref.valueChanges();
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
}
