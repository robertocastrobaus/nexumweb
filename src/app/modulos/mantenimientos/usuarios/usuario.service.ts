import { Injectable } from '@angular/core';
import {Usuario} from './usuario';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import{ HttpClient, HttpHeaders } from'@angular/common/http';
import {map} from'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()

export class UsuarioService {
  
  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion

  /**/private urlEndPoint:string = 'http://'+this.url+'/apiUsuarioPe/usuarioPe';
  private urlEndPoint1:string ='http://'+this.url+'/apiUsuarioPe/addUsuarioPe';
  private urlEndPoint2:string = 'http://'+this.url+'/apiUsuarioPe/modUsuarioPe/';

  constructor(private http: HttpClient) { }
  
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  getUsuario(): Observable<Usuario[]> {
    // return of(USUARIOS);
    // console.log(this.http.get<Usuario[]>(this.urlEndPoint));
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }

  create(usuario: Usuario) : Observable<Usuario> {
  return this.http.post<Usuario>(this.urlEndPoint1, usuario, {headers: this.httpHeaders});
  }

  actualizaEstado(id: number, usr : String) : Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint2}/${id}/${usr}`,{headers: this.httpHeaders})
  }
  
}
