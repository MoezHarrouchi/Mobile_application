import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  postData: any;
  loading:Boolean = false;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
  };
  slides= null;
  shops = null;
  coursDisponible =null;
  constructor( private wordpress:WordpressService) {}

  ngOnInit(){
    this.getData();
  }
  async getData() {
    await this.wordpress.getAPIData()
    .subscribe(res=>{
      this.slides = res.filter(item=>item.name.includes('slide'));
      this.shops = res.filter(item=>item.name.includes('shope'));
      this.loading=true;
    },error=>{
    });
}
}