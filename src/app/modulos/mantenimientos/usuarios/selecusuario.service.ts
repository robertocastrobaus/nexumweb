import { Injectable } from '@angular/core';
import {Selecusuario} from './Selecusuario';
import { HttpClient } from'@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelecusuarioService {

  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion

  private urlEndPoint:string = 'http://1'+this.url+'/apiUsuario/selectOption';

  constructor(private http: HttpClient) { }
  
  getUsuario(): Observable<Selecusuario[]> {
    // return of(USUARIOS);
     console.log(this.http.get<Selecusuario[]>(this.urlEndPoint));
    return this.http.get<Selecusuario[]>(this.urlEndPoint);
  }
}
