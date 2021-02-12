import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, empty, throwError } from 'rxjs';
import { catchError  , map} from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';
import { Planning } from '../models/planning'

@Injectable({
  providedIn: 'root'
})

export class WordpressService {
  
  constructor( private http: HttpClient , private configuration: ConfigurationService) { };

  httpHeader = {
    headers: new HttpHeaders({'Content-type': 'Application/json'})
    };
  consumerKey = 'ck_220197083d36b83637cf08ec2183cd9531d45bf0';
  consumerSecret = 'cs_ab1e48c6654e86685b0c6a9a781327bde23b6e6c';
  httpHeader = {
    headers: new HttpHeaders({'Content-type': 'Application/json'})
  };
   id: any;

   private errorHandler(error: HttpErrorResponse){
     if (error.error instanceof ErrorEvent){
       console.error('error Message', error.message);
     } else {
       console.error(
         `Error Status : ${error.status}` + `Body : ${error.error}`
       );
     }
     return throwError('Check The Code and Server response from endpoint');
   }

   getHomeData(): Observable<any>{
     return this.http.get(this.configuration.getUrlServices().imagesService,this.httpHeader).pipe(
       map(this.dataExtract),
       catchError(this.errorHandler)
     );
   }

   getCoursesDisponible(id): Observable<any>{
        return this.http.get(this.configuration.getUrlServices().freecoursService+id+'/29',this.httpHeader).pipe(
          map(this.dataExtract),
          catchError((err)=>{
            return empty();
          })
        );
      
  }
  getAllContentCourses(idPost): Observable<any>{
    return this.http.get(this.configuration.getUrlServices().contentCoursesService+idPost,this.httpHeader).pipe(
      map(this.dataExtract),
      catchError((error)=>{
        return empty();
      })
    );
  }
  getProducts(){

    return this.http.get('https://www.wasserschule.de/index.php/wp-json/wc/v3/products?consumer_key=ck_c1fb88a602719192b5757f9f13b41b97dfcc8af6&consumer_secret=cs_112da8e8939b628ca895f984492a34da323bc16f',this.httpHeader)
    .pipe(
      map(this.dataExtract),
      catchError((error)=>{
        return empty();
      })
    );
  }
  subscribeToCourse(kursNr,action,grp,formData){
    return this.http.post(this.configuration.getUrlServices().subscribeToCours+kursNr+'/'+action+'/'+grp,formData)
    .pipe(
      map(this.dataExtract),
      catchError(this.errorHandler)
    );    
  }
  getPlanning(kursNr,KursBezID,Aktion):Observable<Planning>{
    return this.http.get(this.configuration.getUrlServices().planningService+kursNr+'/'+KursBezID+'/'+Aktion).pipe(
      map((response:Planning)=>response as Planning),
      catchError((error)=>{
        return empty();
      })
    );
  }

  private dataExtract( res: Response){
     const body = res;
     return body || {};
   }
} 
