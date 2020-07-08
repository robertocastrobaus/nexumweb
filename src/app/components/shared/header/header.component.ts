import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  nombre = localStorage.getItem('nombre'); 
  usuario = localStorage.getItem('user'); 
  
  constructor(private _route: Router) {  }

  ngOnInit() {
  }

  cerrarSesion(){
    localStorage.removeItem('user');
    localStorage.removeItem('nombre');
    localStorage.removeItem('codigo');
    localStorage.removeItem('rol');
    localStorage.removeItem('modulo');
    this._route.navigate(['login']);

  }
 

}
