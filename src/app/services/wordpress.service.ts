import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, empty, throwError } from 'rxjs';
import { catchError  , map} from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';
import * as WC from 'woocommerce-api';

@Injectable({
  providedIn: 'root'
})

export class WordpressService {
  woocommerce: any;
  constructor( private http: HttpClient , private configuration: ConfigurationService) { }


   httpHeader = {
    headers: new HttpHeaders({'Content-type': 'Application/json'})
    };
    consumerKey = 'ck_220197083d36b83637cf08ec2183cd9531d45bf0';
    consumerSecret = 'cs_ab1e48c6654e86685b0c6a9a781327bde23b6e6c';

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
     return this.http.get(this.configuration.getUrlServices().imagesService, this.httpHeader).pipe(
       map(this.dataExtract),
       catchError(this.errorHandler)
     );
   }

   getCoursesDisponible(id): Observable<any>{
    if(id){
      return this.http.get(this.configuration.getUrlServices().freecoursService+id+'/29', this.httpHeader).pipe(
        map(this.dataExtract),
        catchError(this.errorHandler)
      );
    }else{
      return empty();
    }
  }
  getAllContentCorses(){
    return this.http.get(this.configuration.getUrlServices().contentCoursesService, this.httpHeader).pipe(
      map(this.dataExtract),
      catchError(this.errorHandler)
    );
  }
  getProducts(){
  this.woocommerce = WC({
    url: this.configuration.getUrlServices().mainService,
    consumerKey: this.consumerKey,
    consumerSecret: this.consumerSecret,
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true
  });
    return this.woocommerce.getAsync('products?_fields=id,name,attributes,price,weight,stock_quantity');
  }

   private dataExtract( res: Response){
     const body = res;
     return body || {};
   }
}
