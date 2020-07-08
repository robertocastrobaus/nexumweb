import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {map, catchError} from'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import Swal from 'sweetalert2';
import { Menu } from './menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});
  

  //private url:string = '172.16.1.228:9898'; // desarrollo
  private url:string = '192.168.1.13:8088'; // produccion
  
  private urlEndPoint:string = 'http://'+this.url+'/menu/getAll';
  private urlEndPoint1:string = 'http://'+this.url+'/menu/getAllMod';


  constructor(private http:HttpClient) { }

  getmenu(noCia: String, user: String, modulo: String ): Observable<Menu[]>{

    return this.http.get<Menu[]>(`${this.urlEndPoint}/${noCia}/${user}/${modulo}`);
  
  }


}
