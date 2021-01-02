import { Injectable } from '@angular/core';
import * as coursDetails from '../../assets/configuration/coursDetails.json';
import * as urls from '../../assets/configuration/servicesUrl.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  menuContent: any = (coursDetails as any).default;
  urls: any = (urls as any).default;

  constructor(){ }

  getContentCoursByTitle(parent: any, child: any, listMenu: any){
    return listMenu.find(el => el.name.toUppercase().replace(/\s/g, '') === child.toUppercase().replace(/\s/g, ''));
  }

  getMenuContent(){
    return this.menuContent;
  }
  getUrlServices(): object{
    return this.urls;
  }
}
