import { Injectable } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationResolverService implements Resolve<any> {

  constructor( private configurationService : ConfigurationService) { }
  resolve(route:ActivatedRouteSnapshot){
    let title = route.paramMap.get('title');
    return this.configurationService.getContentCoursByTitle(title);

  }
}