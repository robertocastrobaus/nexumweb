import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import{ HttpClient, HttpHeaders } from'@angular/common/http';
import {map, catchError} from'rxjs/operators';
import { Periodos } from './periodos';
import Swal from 'sweetalert2';

@Injectable({
   providedIn: "root"
 })

export class PeriodosService {
  
  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  
  private urlEndPoint:string = 'http://'+this.url+'/Periodo/getAll';
  private urlEndPoint1:string = 'http://'+this.url+'/Periodo/putPeriodo';
  private urlEndPoint2:string = 'http://'+this.url+'/Periodo/addPeriodo';

  constructor(private http: HttpClient) { }
  
  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.urlEndPoint);
  }

  actualizaEstado(id: number, user: String) : Observable<Periodos>{
    return this.http.put<Periodos>(`${this.urlEndPoint1}/${id}/${user}`,{headers: this.httpHeaders})
  }

  guardaPeriodo(periodo: Periodos) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint2, periodo, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'error',
          title: e.error.mensaje ,
          text:  e.error.error        
          // footer: '<a href>Why do I have this issue?</a>'
        });
        return throwError(e);
      })
    );
    }
}
