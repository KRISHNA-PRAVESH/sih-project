import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth,private router:Router) { }

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

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login'])
  }
}
