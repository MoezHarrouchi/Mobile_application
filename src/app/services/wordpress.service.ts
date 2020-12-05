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
   apiUrl ='http://localhost/wasserschule/wp-json/wl/v1/posts';

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
     return this.http.get(this.apiUrl,this.httpHeader).pipe(
       map(this.dataExtract),
       catchError(this.errorHandler)
     );
   }
 
   private dataExtract( res : Response){
     const body = res;
     return body || {}
   }
}
