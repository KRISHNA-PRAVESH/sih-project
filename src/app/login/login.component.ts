import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {
    username: '',
    password: ''
  };

  isSignedIn = false;
  constructor(public firebaseService : FirebaseService){}
  ngOnInit(){
   if(localStorage.getItem('user') != null){
    this.isSignedIn = true;
   }
   else this.isSignedIn = false;
  }
  async signIn(){
    await this.firebaseService.signIn(this.formData.username,this.formData.password)
    if(this.firebaseService.isLoggedIn()){
      this.isSignedIn = true;
    }
  }
  handleLogout(){
    this.isSignedIn = false;
  }
}
