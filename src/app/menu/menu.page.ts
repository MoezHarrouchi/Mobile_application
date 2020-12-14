import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../services/configuration.service';
import * as data from '../../assets/configuration/coursDetails.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  navigate:any;
  dataFromJson:any = (data as any).default;

 constructor(private router:Router, private configurationService:ConfigurationService) {
    this.sideMenu();
  }

  ngOnInit() {
  }
  sideMenu() {  
    this.navigate = this.dataFromJson;  
  }
  onSelectCours(parent,child){  
    this.configurationService.setListMenu(this.dataFromJson)
    this.router.navigateByUrl('/cours/'+parent+'/'+child);

  }

}