import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx'
import { SlidesComponent } from './components/slides/slides.component';

import { MenuPage } from './components/menu/menu.page';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [AppComponent,MenuPage,SlidesComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  HttpClientModule,
  ReactiveFormsModule,
  NgxPayPalModule
],
  providers: [
    StatusBar,
    SplashScreen,
    Stripe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
