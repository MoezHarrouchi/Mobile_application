import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';

@Injectable({
  providedIn: 'root'
})
export class WordpressResolverService implements Resolve <any>{

  constructor( private wordpressService: WordpressService) {

   }
  resolve(route: ActivatedRouteSnapshot){
    const coursesDetail = {
      parent: route.paramMap.get('parent'),
      name: route.paramMap.get('child'),
      content: this.wordpressService.getAllContentCorses()
    };
    return coursesDetail;
  }
}
