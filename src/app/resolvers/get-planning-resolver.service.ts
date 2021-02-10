import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot,ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router'
import { WordpressService } from '../services/wordpress.service'

@Injectable({
  providedIn: 'root'
})
export class GetPlanningResolverService implements Resolve<any>{

  constructor(private wordpressService:WordpressService) { }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const kursNr = route.paramMap.get('kursNr');
    const kursBezID = route.paramMap.get('kursBezID');
    const action = route.paramMap.get('action');
    return this.wordpressService.getPlanning(kursNr,kursBezID,action);
  }
}
