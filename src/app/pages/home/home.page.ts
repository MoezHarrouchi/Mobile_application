import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  postData: any;
  loading: boolean = false;
  slideOpts = {
    autoHeight: true,
    autoplay: true,
    initialSlide: 0,
    slidesPerView: 1,
    speed: 500
  };
  slides = null;
  shops = null;
  coursDisponible = null;
  constructor( private wordpress: WordpressService, private configuration: ConfigurationService) {}

  ngOnInit(){
    this.getData();

  }
  async getData() {
    this.slides = ["https://www.wasserschule.de/wp-content/uploads/2019/12/Shop-header-Team.jpg"];
    this.shops = ["https://www.wasserschule.de/wp-content/uploads/2019/12/rot_weiß_800.jpg","https://www.wasserschule.de/wp-content/uploads/2019/12/white-blue-girl-800.jpg","https://www.wasserschule.de/wp-content/uploads/2019/12/oil3-800.jpg","https://www.wasserschule.de/wp-content/uploads/2019/12/red-boy2-800.jpg"];
    this.loading = true;

    await this.wordpress.getHomeData()
    .subscribe(res => {
      this.slides = ["https://www.wasserschule.de/wp-content/uploads/2019/12/Shop-header4.jpg"];
      this.shops = [];
      this.loading = true;
    }, error => {
    });
}
iconLink(){
  console.log("Hi");
}
}
