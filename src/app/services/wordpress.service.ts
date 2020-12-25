import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import { Observable,of, throwError } from 'rxjs';
import { catchError  ,map} from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service'

@Injectable({
  providedIn: 'root'
})

export class WordpressService {

  constructor( private http : HttpClient , private configuration : ConfigurationService) { }


   httpHeader = {
    headers: new HttpHeaders({'Content-type':'Application/json'})
    }

   id:any;        

   private errorHandler(error: HttpErrorResponse){
     if(error.error instanceof ErrorEvent){
       console.error('error Message',error.message);
     } else {
       console.error(
         `Error Status : ${error.status}` +`Body : ${error.error}`
       );
     }
     return throwError('Check The Code and Server response from endpoint');
   }
 
   getHomeData(): Observable<any>{
     return this.http.get(this.configuration.urls.imagesService,this.httpHeader).pipe(
       map(this.dataExtract),
       catchError(this.errorHandler)
     );
   }

   getAPICoursesDisponible(): Observable<any>{
    let apiforDisponibleCourse = `https://api.allorigins.win/get?url=${encodeURIComponent(this.configuration.urls.coursService)}`;
    return this.http.get(apiforDisponibleCourse,this.httpHeader).pipe(
      map(this.dataExtract),
      catchError(this.errorHandler)
    );
  }
  getAllContentCorses(){
    return this.http.get("http://localhost/wasserschuleNew/wp-json/wl/v1/courses",this.httpHeader).pipe(
      map(this.dataExtract),
      catchError(this.errorHandler)
    )
  }
 
   private dataExtract( res : Response){
     const body = res;
     return body || {}
   }
}
