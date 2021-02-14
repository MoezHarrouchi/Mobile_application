import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WordpressService } from '../services/wordpress.service';

@Injectable({
  providedIn: 'root'
})
export class GetContentCoursesResolverService implements Resolve <any>{

  constructor( private wordpressService: WordpressService) {

   }
  resolve(route: ActivatedRouteSnapshot){
    const idPost=route.paramMap.get('idPost');
    const id = route.paramMap.get('id');
    const coursesDetail = {
      content: this.wordpressService.getAllContentCourses(idPost).pipe(catchError((error)=>{
        return empty();
      })),
      freeCourses:this.wordpressService.getCoursesDisponible(id),
      id : id,
    };
    return coursesDetail;
  }
}
