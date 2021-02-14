import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WordpressService } from './services/wordpress.service';

import { Router,Event,NavigationStart,NavigationEnd } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isLoader:boolean=false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route : Router,
    private wordpress:WordpressService
  ) {
    this.initializeApp();
  }
  ngOnInit(){
    this.routeEvents();
  }

  routeEvents(){
    this.route.events.subscribe((event:Event)=>{
      switch(true){
        case event instanceof NavigationStart:{
          this.isLoader = true;
          break;
        }
        case event instanceof NavigationEnd:{
          this.isLoader = false;
          break;
        }
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
