import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  navigate: any;

 constructor(private router: Router, private configurationService: ConfigurationService,
  private menu:MenuController 
  ) {
  }
  ngOnInit() {
    this.sideMenu();
  }
  sideMenu() {
    this.navigate = this.configurationService.getMenuContent();
  }
  onSelectCours(postId, id){
    if (postId === "home"){
      this.router.navigateByUrl("");
    }else if (postId === "shop"){
      this.router.navigateByUrl('/shop');
    }else if (postId == "zumwasserplan"){
      window.location.href = "https://www.wasser-plan.de/";
    }else if (postId=="ausbildung"){
      this.router.navigateByUrl("/formation")

    }else{
      this.router.navigateByUrl('/cours/'+ postId+'/' + id);
    }
    this.menu.close("main-menu");

  }

}