import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import{ HttpClient, HttpHeaders } from'@angular/common/http';
import { Evaluacion } from './evaluacion';
import { EvaluacionParam } from './evaluacionParam';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  private urlEndPoint:string = 'http://'+this.url+'/Evaluacion/evaluacion';
  private urlEndPoint1:string = 'http://'+this.url+'/Evaluacion/evaluacionA';
  private urlEndPoint2:string = 'http://'+this.url+'/Periodo/getCount';
  private urlEndPoint3:string = 'http://'+this.url+'/Evaluacion/getGrafico';
  private urlEndPoint4:string = 'http://'+this.url+'/apiUsuarioPe/getId';

  constructor(private http: HttpClient ) {}

  getEvaluacionService(param: EvaluacionParam): Observable<Evaluacion[]> {
    
    return this.http.post<Evaluacion[]>(this.urlEndPoint,param,{headers: this.httpHeaders});
  }

  getCountPeriodo(cia: String, mes: number, anio:number ): Observable<number> {
    
    return this.http.get<number>(`${this.urlEndPoint2}/${cia}/${mes}/${anio}`);
  }

  actualizarEv(param: EvaluacionParam) : Observable<Evaluacion> {
    return this.http.put<Evaluacion>(this.urlEndPoint1, param, {headers: this.httpHeaders});
 }

 grafico(param: EvaluacionParam) : Observable<Evaluacion[]> {
  return this.http.post<Evaluacion[]>(this.urlEndPoint3, param, {headers: this.httpHeaders});
}

obtUsr(id: number) : Observable<any>{
  return this.http.get<any>(`${this.urlEndPoint4}/${id}`)
}

}
