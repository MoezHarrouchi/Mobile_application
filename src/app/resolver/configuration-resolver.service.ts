import { Injectable } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationResolverService implements Resolve<any> {

  constructor( private configurationService : ConfigurationService) { }
  resolve(route:ActivatedRouteSnapshot){
    let parent = route.paramMap.get('parent');
    let child = route.paramMap.get('child');
    return this.configurationService.getContentCoursByTitle(parent,child);

  }
}