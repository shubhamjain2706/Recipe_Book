import { Component, OnInit } from '@angular/core';
// import { LoggingService } from './logging.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCkZjRjZAKbpc2FQMFPfKAcSyo6fBdG1Vg",
      authDomain: "ng-recipe-book-cef50.firebaseapp.com"
    });
  }

  // const service  = new LoggingService();
  // service.logStatusChange("hello");

  // constructor(private loggingService : LoggingService) {}

}
