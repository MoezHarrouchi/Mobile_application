import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';

@Injectable({
  providedIn: 'root'
})
export class GetContentCoursesResolverService implements Resolve <any>{

  constructor( private wordpressService: WordpressService) {

   }
  resolve(route: ActivatedRouteSnapshot){
    const idPost=route.paramMap.get('idPost');
    const coursesDetail = {
      id : route.paramMap.get('id'),
      content: this.wordpressService.getAllContentCourses(idPost)
    };
    return coursesDetail;
  }
}
