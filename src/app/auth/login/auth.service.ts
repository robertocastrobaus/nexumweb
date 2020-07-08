import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {map, catchError} from'rxjs/operators';
import { Param } from './param';
import { Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  
  private urlEndPoint:string = 'http://'+this.url+'/apiUsuarioPe/getLg';

  constructor(private http:HttpClient) { }

  authenticated(){
    if(localStorage.getItem('user')){
      return true
    }else{
      return false;
    }
  }
  
  login(param: Param) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, param, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: e.error.mensaje          
          // footer: '<a href>Why do I have this issue?</a>'
        });
        return throwError(e);
      })
    );
 }

 
}
