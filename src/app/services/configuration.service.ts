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
   
  getMenuContent(){
    return this.menuContent;
  }
  getUrlServices(): urlService{
    return this.urls;
  }
}

interface urlService{
  mainService,
  imagesService,
  contentCoursesService,
  freecoursService,
  subscribeToCours,
  planningService
}