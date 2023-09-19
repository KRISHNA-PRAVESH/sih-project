import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

import { FormsModule } from '@angular/forms'; 

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireDatabaseModule } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat';

//components
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//Graphs
// import { PlotlyModule } from 'angular-plotly.js';
import { NgChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { DashTestComponent } from './dash-test/dash-test.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmsComponent } from './sms/sms.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GraphComponent,
    DashTestComponent,
    SmsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    AngularFireDatabaseModule,
    NgChartsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
