import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service'
import { ConfigurationService } from '../../services/configuration.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  postData: any;
  loading:Boolean = false;
  slideOpts = {
    autoHeight: true,
    autoplay: true,
    initialSlide: 0,
    slidesPerView: 1
  };
  slides= null;
  shops = null;
  coursDisponible =null;
  constructor( private wordpress:WordpressService, private configuration : ConfigurationService) {}

  ngOnInit(){
    this.getData();
  }
  ngAfterViewInit() {
  }
  async getData() {
    await this.wordpress.getHomeData()
    .subscribe(res=>{
      this.slides = res.filter(item=>item.url.includes('header')).map(el=>this.configuration.urls.mainService.concat(el.url.slice(el.url.indexOf("uploads"),el.url.length)));
      this.shops = res.filter(item=>item.url.includes('blue')).map(el=>this.configuration.urls.mainService.concat(el.url.slice(el.url.indexOf("uploads"),el.url.length)));
      this.loading=true;
    },error=>{
    });
}
}