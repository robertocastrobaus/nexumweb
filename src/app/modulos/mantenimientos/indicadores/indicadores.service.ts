import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import{ HttpClient, HttpHeaders } from'@angular/common/http';
import {map} from'rxjs/operators';
import {Indicadores} from './indicadores';
import {IndicadoresJson} from './indicadoresJson';
import {Usuario} from '../usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  
  private urlEndPoint:string = 'http://'+this.url+'/apiIndicadores/indicadorPe';
  private urlEndPoint1:string = 'http://'+this.url+'/apiIndicadores/addIndicador';
  private urlEndPoint2:string = 'http://'+this.url+'/apiUsuarioPe/selectOptionPe';
  private urlEndPoint3:string = 'http://'+this.url+'/apiIndicadores/modIndicadores';
  private urlEndPoint4:string = 'http://'+this.url+'/apiIndicadores/modEstadoInd';

  constructor(private http: HttpClient ) { }
  
  getIndicador(): Observable<Indicadores[]> {
    // return of(USUARIOS);
    // console.log(this.http.get<Usuario[]>(this.urlEndPoint));
    return this.http.get<Indicadores[]>(this.urlEndPoint);
  }

  create(indicador: IndicadoresJson) : Observable<IndicadoresJson> {

    return this.http.post<IndicadoresJson>(this.urlEndPoint1, indicador, {headers: this.httpHeaders});
    }

    actualizarInd(indicador: IndicadoresJson) : Observable<IndicadoresJson> {
         return this.http.put<IndicadoresJson>(this.urlEndPoint3, indicador, {headers: this.httpHeaders});
      }

    actualizaEstadoI(id: number, user: String) : Observable<IndicadoresJson>{
      return this.http.put<IndicadoresJson>(`${this.urlEndPoint4}/${id}/${user}`,{headers: this.httpHeaders})
    }

    getUsuario(id: number): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.urlEndPoint2}/${id}`);
    }


}
