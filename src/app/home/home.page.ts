import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  postData: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };
  slides= null;
  shops = null
  constructor( private wordpress:WordpressService) {}

  ngOnInit(){
    this.getData();
  }
  async getData() {
    await this.wordpress.getAPIData()
    .subscribe(res=>{
      console.log(res);
      this.slides = res.filter(item=>item.name.includes('slide'));
      this.shops = res.filter(item=>item.name.includes('shope'));
      console.log(this.postData);
    },error=>{
      console.log(error)
    })
  }
}
