import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {map, catchError} from'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion
  private urlEndPoint:string = 'http://'+this.url+'/menu/getAllMod';

  constructor(private http:HttpClient) { }

  getmod(noCia: String, user: String): Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${noCia}/${user}`).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error Menu',
          text: e.error.mensaje          
          // footer: '<a href>Why do I have this issue?</a>'
        });
        return throwError(e);
      })
    );  
  }


}
