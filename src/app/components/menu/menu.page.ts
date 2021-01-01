import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  navigate:any;

 constructor(private router:Router, private configurationService:ConfigurationService) {
  }
  ngOnInit() {
    this.sideMenu();
  }
  sideMenu() {  
    this.navigate = this.configurationService.getMenuContent(); 
  }
  onSelectCours(parent,child){  
    this.router.navigateByUrl('/cours/'+parent+'/'+child);

  }

}