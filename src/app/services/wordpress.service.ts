import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import { Observable,of, throwError } from 'rxjs';
import { catchError  ,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WordpressService {

  constructor( private http : HttpClient ) { }


   httpHeader = {
    headers: new HttpHeaders({'Content-type':'Application/json'})
    }
   apiForPhoto ='http://192.168.1.173/wasserschule/wp-json/wl/v1/posts';
   apiforDisponibleCourse = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.wasserschule.de/kurssoftware/anmeldung-online.php?Anmeldung=weiter&amp;StandortID=29&amp;KursBezID=48')}`;


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
 
   getAPIData(): Observable<any>{
     return this.http.get(this.apiForPhoto,this.httpHeader).pipe(
       map(this.dataExtract),
       catchError(this.errorHandler)
     );
   }

   getAPICoursesDisponible(): Observable<any>{
    return this.http.get(this.apiforDisponibleCourse,this.httpHeader).pipe(
      map(this.dataExtract),
      catchError(this.errorHandler)
    );
  }
 
   private dataExtract( res : Response){
     const body = res;
     return body || {}
   }
}
